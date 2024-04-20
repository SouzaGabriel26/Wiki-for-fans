import Link from 'next/link';

import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { createSerieDatasource } from '@/data/serie';

export default async function CharacterForm() {
  const serieDataSource = createSerieDatasource();
  const { returnedSeries: series } = await serieDataSource.getAll();

  if (series.length === 0) {
    return (
      <div>
        <p>
          No series found. <Link href="/serie/create">Register a serie</Link>{' '}
          first to relate it to a character.
        </p>
      </div>
    );
  }

  return (
    <form className="h-full space-y-2">
      <div className="flex gap-2">
        <Input required id="name" name="name" placeholder="Name*" />
        <Input id="nickname" name="nickname" placeholder="Nickname" />
      </div>
      <TextArea
        required
        id="description"
        name="description"
        placeholder="Description*"
      />
      <Input
        required
        id="age"
        name="age"
        placeholder="Age*"
        min={1}
        type="number"
      />

      <fieldset className="flex justify-center gap-2">
        <label htmlFor="serieId">Select a serie*</label>

        <select
          id="serieId"
          required
          name="serieId"
          className="rounded-md border outline-none"
        >
          <option value=""></option>
          {series.map((serie) => (
            <option key={serie.id} value={serie.id}>
              {serie.name}
            </option>
          ))}
        </select>
      </fieldset>

      {/* MultiSelect - personalities optional */}
      {/* MultiSelect - friends optional */}
      {/* MultiSelect - enemies optinoal */}

      {/* Image - ?? */}

      {/* favoritePhrase - input optional */}
      {/* isProtagonist - checkbox optional */}
    </form>
  );
}
