import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import Input from '@/components/Input';
import InputMultiSelect from '@/components/InputMultiSelect';
import TextArea from '@/components/TextArea';
import { createSerieDatasource } from '@/data/serie';

const serieSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(10, 'Description must have at least 10 characters'),
  episodes: z.number({
    required_error: 'Episodes is required',
  }),
  seasons: z.number({
    required_error: 'Seasons is required',
  }),
  platforms: z.array(z.string()),
  status: z.enum(['FINISHED', 'CANCELED', 'IN_PROGRESS'], {
    required_error: 'Status is required',
  }),
});

async function serverActionToCreateSerie(formData: FormData) {
  'use server';

  const entries = Object.fromEntries(formData.entries());

  const treatedData = {
    name: entries.name,
    description: entries.description,
    episodes: Number(entries.episodes),
    seasons: Number(entries.seasons),
    platforms: JSON.parse(entries.platformsArray as string),
    status: entries.status,
  };

  const dataAfterValidation = serieSchema.safeParse(treatedData);

  if (!dataAfterValidation.success) {
    return redirect(
      `/serie/create?error=${dataAfterValidation.error.errors[0].message}`,
    );
  }

  const serieDataSource = createSerieDatasource();
  const { createdSerie, errors } = await serieDataSource.create(
    dataAfterValidation.data,
  );

  if (!createdSerie) {
    return redirect(`/serie/create?error=${errors.message}`);
  }

  if (!errors) {
    revalidatePath('/');
    return redirect('/');
  }
}

export default async function SerieForm() {
  return (
    <form
      key={new Date().toISOString()}
      className="space-y-4"
      action={serverActionToCreateSerie}
    >
      <Input id="name" name="name" placeholder="Name" required />
      <TextArea
        required
        id="description"
        name="description"
        placeholder="Description"
      />
      <div className="flex gap-2">
        <Input
          required
          id="episodes"
          type="number"
          name="episodes"
          placeholder="Episodes"
        />
        <Input
          required
          id="seasons"
          type="number"
          name="seasons"
          placeholder="Seasons"
        />
      </div>
      <InputMultiSelect
        id="platforms"
        name="platforms"
        placeholder="Available platforms"
      />
      <fieldset className="space-x-2">
        <label htmlFor="status">Status</label>
        <select
          required
          id="status"
          name="status"
          className="rounded-md outline-none"
        >
          <option value=""></option>
          <option value="FINISHED">FINISHED</option>
          <option value="CANCELED">CANCELED</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
        </select>
      </fieldset>

      <button
        type="submit"
        className="bottom-5 right-10 mt-10 w-full rounded-md bg-slate-600 p-2 text-white md:absolute md:w-fit"
      >
        Register
      </button>
    </form>
  );
}
