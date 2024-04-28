import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateCharacterArgs } from '@/app/api/configs/context/prismaMutations';
import CharacterForm from '@/app/character/components/CharacterForm';
import Modal from '@/components/Modal';
import { NavigateBack } from '@/components/NavigateBack';
import { createCharacterDatasource } from '@/data/character';
import { cloudinaryService } from '@/lib/cloudinary';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const characterDataSource = createCharacterDatasource();
  const { returnedCharacter: character } = await characterDataSource.getById(
    params.id,
  );

  async function serverActionToUpdateCharacter(formData: FormData) {
    'use server';

    const entries = Object.fromEntries(formData.entries());

    const updateCharacterObject: CreateCharacterArgs = {
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
      image: character.image,
      imagePublicId: character.imagePublicId,
    };

    const imageFile = entries.imageFile as File;
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    if (imageFile.size > 0) {
      try {
        if (character.imagePublicId) {
          await cloudinaryService.deleteAsset(character.imagePublicId);
        }

        const { secure_url, public_id } = await cloudinaryService.createAsset(
          buffer,
          {
            folder: 'characters',
            tags: ['characters'],
            use_filename: true,
          },
        );

        updateCharacterObject.image = secure_url;
        updateCharacterObject.imagePublicId = public_id;
      } catch (error) {
        console.error(error);
        return redirect('/');
      }
    }

    const characterDataSource = createCharacterDatasource();
    const { updatedCharacter } = await characterDataSource.updateById(
      params.id,
      updateCharacterObject,
    );

    if (updatedCharacter) {
      revalidatePath('/');
      return redirect(`/?serieId=${updatedCharacter.serie.id}`);
    }
  }

  return (
    <Modal contentWidth="w-full max-w-[380px]">
      <NavigateBack className="absolute left-1 top-1 md:left-2 md:top-2" />
      <h1 className="text-xl text-slate-800">Edit {character.name}</h1>

      <div className="max-h-[500px] overflow-y-auto p-2">
        <CharacterForm
          isEdit
          character={character}
          action={serverActionToUpdateCharacter}
        />
      </div>
    </Modal>
  );
}
