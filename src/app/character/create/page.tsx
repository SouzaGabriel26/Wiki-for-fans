import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { CreateCharacterArgs } from '@/app/api/configs/context/prismaMutations';
import { NavigateBack } from '@/components/NavigateBack';
import { createCharacterDatasource } from '@/data/character';
import { cloudinaryService } from '@/lib/cloudinary';

import CharacterForm from '../components/CharacterForm';

type Props = {
  searchParams: {
    error?: string;
  };
};

async function serverActionToCreateCharacter(formData: FormData) {
  'use server';

  const entries = Object.fromEntries(formData.entries());

  const createCharacterObject: CreateCharacterArgs = {
    name: entries.name as string,
    nickName: entries.nickname as string,
    description: entries.description as string,
    age: Number(entries.age),
    serieId: entries.serieId as string,
    isProtagonist: entries.isProtagonist === 'true',
    personalities: JSON.parse(entries.personalitiesArray as string),
    friends: JSON.parse(entries.friendsArray as string),
    enemies: JSON.parse(entries.enemiesArray as string),
    favoritePhrase: entries.favoritePhrase as string,
    image: '',
    imagePublicId: '',
  };

  const imageFile = entries.imageFile as File;
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  if (imageFile.size > 0) {
    try {
      const { secure_url, public_id } = await cloudinaryService.createAsset(
        buffer,
        {
          folder: 'characters',
          tags: ['characters'],
          use_filename: true,
        },
      );

      createCharacterObject.image = secure_url;
      createCharacterObject.imagePublicId = public_id;
    } catch (error) {
      console.error(error);
      return redirect('/character/create?error=imgUpload');
    }
  }

  const characterDataSource = createCharacterDatasource();
  const { createdCharacter } = await characterDataSource.create(
    createCharacterObject,
  );

  if (createdCharacter) {
    revalidatePath('/');
    return redirect(`/?serieId=${createdCharacter.serie.id}`);
  }
}

export default async function Page({ searchParams }: Props) {
  const session = await getServerSession();

  if (!session) {
    return redirect('/');
  }

  return (
    <div className="flex h-full flex-col p-4">
      <NavigateBack className="absolute left-1 top-1 hover:underline md:left-5 md:top-4" />
      <h1 className="mt-5 animate-show-content-up text-center text-2xl text-slate-800 md:mt-0">
        Register a character
      </h1>

      {searchParams.error === 'imgUpload' && (
        <div
          className="mt-4 flex flex-col items-center justify-between gap-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-center text-red-700 md:flex-row"
          role="alert"
        >
          <span>Image upload service temporarily unavailable!</span>

          <small className="text-xs">
            You can create a character without a image, and edit it after
          </small>

          <Link href="/character/create">Try again</Link>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-72 flex-grow overflow-y-auto px-4 py-2 md:max-w-md">
        <CharacterForm action={serverActionToCreateCharacter} />
      </div>
    </div>
  );
}
