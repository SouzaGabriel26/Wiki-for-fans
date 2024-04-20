import Link from 'next/link';

import Input from '@/components/Input';
import InputMultiSelect from '@/components/InputMultiSelect';
import TextArea from '@/components/TextArea';
import { createSerieDatasource } from '@/data/serie';

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
    <form className="space-y-2 pb-2">
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
          <label htmlFor="serieId">Serie:</label>
          <select name="serieId" id="serieId">
            <option value=""></option>
            {series.map((serie) => (
              <option key={serie.id} value={serie.id}>
                {serie.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="flex gap-2">
          <span>Is Protagonist?</span>
          <div className="flex items-center gap-2">
            <label htmlFor="yes">Yes</label>
            <Input
              required
              className="h-fit w-4"
              id="yes"
              name="isProtagonist"
              type="radio"
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
            />
          </div>
        </fieldset>

        <Input type="file" placeholder="File" className="mt-5" />

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

      <button
        type="submit"
        className="bottom-5 right-10 w-full rounded-md bg-slate-600 p-2 text-white md:absolute md:w-fit"
      >
        Register
      </button>
    </form>
  );
}
