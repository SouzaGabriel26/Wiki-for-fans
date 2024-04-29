import Link from 'next/link';

import Input from '@/components/Input';
import InputMultiSelect from '@/components/InputMultiSelect';
import { SubmitButton } from '@/components/SubmitButton';
import TextArea from '@/components/TextArea';
import { CharacterById } from '@/data/character';
import { createSerieDatasource } from '@/data/serie';

type CharacterFormProps = {
  isEdit?: boolean;
  character?: CharacterById;
  action: (formData: FormData) => Promise<undefined>;
};

export default async function CharacterForm({
  isEdit = false,
  character,
  action,
}: CharacterFormProps) {
  if (isEdit && !character) {
    throw new Error(
      '> CharacterForm: To use this component in edit mode, you must provide a character.',
    );
  }

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
      action={action}
      className="space-y-2 pb-2"
    >
      <div className="mb-4 space-y-2 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-2 md:flex-row">
          <Input
            required
            id="name"
            name="name"
            placeholder="Name*"
            defaultValue={character?.name}
          />
          <Input
            id="nickname"
            name="nickname"
            placeholder="Nickame"
            maxLength={10}
            defaultValue={character?.nickName}
          />
        </div>

        <TextArea
          required
          id="description"
          name="description"
          placeholder="Description*"
          defaultValue={character?.description}
        />
        <Input
          id="age"
          type="number"
          className="mb-1"
          name="age"
          placeholder="Age*"
          required
          defaultValue={character?.age}
        />

        <fieldset className="flex gap-2">
          <label htmlFor="serieId">Serie* :</label>
          <select
            required
            name="serieId"
            id="serieId"
            defaultValue={character?.serie?.id}
          >
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
              defaultChecked={character?.isProtagonist}
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
              defaultChecked={character?.isProtagonist === false}
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
          defaultOptions={character?.personalities}
        />

        <InputMultiSelect
          id="friends"
          name="friends"
          placeholder="Friends"
          defaultOptions={character?.friends}
        />

        <InputMultiSelect
          id="enemies"
          name="enemies"
          placeholder="Enemies"
          defaultOptions={character?.enemies}
        />

        <Input
          id="favoritePhrase"
          name="favoritePhrase"
          placeholder="Favorite Phrase"
          defaultValue={character?.favoritePhrase}
        />
      </div>

      <SubmitButton className="bottom-5 right-10 py-2 md:absolute">
        {isEdit ? 'Save' : 'Register'}
      </SubmitButton>
    </form>
  );
}
