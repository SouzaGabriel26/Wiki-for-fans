import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { CreateCharacterArgs } from '@/app/api/configs/context/prismaMutations';
import Input from '@/components/Input';
import InputMultiSelect from '@/components/InputMultiSelect';
import { SubmitButton } from '@/components/SubmitButton';
import TextArea from '@/components/TextArea';
import { createCharacterDatasource } from '@/data/character';
import { createSerieDatasource } from '@/data/serie';
import { cloudinaryService } from '@/lib/cloudinary';

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

export default async function CharacterForm() {
  const serieDatasource = createSerieDatasource();
  const { returnedSeries: series } = await serieDatasource.getAll();

  if (series.length === 0) {
    return (
      <div>
        <p>No series was registered yet!</p>
        <Link href="/serie/create">Click to register</Link>
      </div>
    );
  }

  return (
    <form
      key={new Date().toISOString()}
      action={serverActionToCreateCharacter}
      className="space-y-2 pb-2"
    >
      <div className="mb-4 space-y-2 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-2 md:flex-row">
          <Input required id="name" name="name" placeholder="Name*" />
          <Input id="nickname" name="nickname" placeholder="Nickame" />
        </div>

        <TextArea
          required
          id="description"
          name="description"
          placeholder="Description*"
        />
        <Input
          id="age"
          type="number"
          className="mb-1"
          name="age"
          placeholder="Age*"
          required
        />

        <fieldset className="flex gap-2">
          <label htmlFor="serieId">Serie* :</label>
          <select required name="serieId" id="serieId">
            <option value=""></option>
            {series.map((serie) => (
              <option key={serie.id} value={serie.id}>
                {serie.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="flex gap-2">
          <span>Is Protagonist? *</span>
          <div className="flex items-center gap-2">
            <label htmlFor="yes">Yes</label>
            <Input
              required
              className="h-fit w-4"
              id="yes"
              name="isProtagonist"
              type="radio"
              value="true"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="no">No</label>
            <Input
              required
              className="h-fit w-4"
              id="no"
              name="isProtagonist"
              type="radio"
              value="false"
            />
          </div>
        </fieldset>

        <Input
          type="file"
          placeholder="File"
          name="imageFile"
          className="mt-5"
          accept="image/png, image/jpeg, image/jpg"
        />

        <InputMultiSelect
          id="personalities"
          name="personalities"
          placeholder="Personalities"
        />

        <InputMultiSelect id="friends" name="friends" placeholder="Friends" />

        <InputMultiSelect id="enemies" name="enemies" placeholder="Enemies" />

        <Input
          id="favoritePhrase"
          name="favoritePhrase"
          placeholder="Favorite Phrase"
        />
      </div>

      <SubmitButton className="bottom-5 right-10 py-2 md:absolute">
        Register
      </SubmitButton>
    </form>
  );
}
