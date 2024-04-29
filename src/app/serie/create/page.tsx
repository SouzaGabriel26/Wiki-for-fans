import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { NavigateBack } from '@/components/NavigateBack';
import { createSerieDatasource } from '@/data/serie';

import SerieForm from '../components/SerieForm';

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

type Props = {
  searchParams: {
    error?: string;
  };
};

export default function Page({ searchParams }: Props) {
  const { error } = searchParams;

  return (
    <div className="flex h-full flex-col p-4">
      <NavigateBack className="absolute left-1 top-1 hover:underline md:left-5 md:top-5" />
      <h1 className="mt-5 animate-show-content-up text-center text-2xl text-slate-800 md:mt-0">
        Create serie page
      </h1>

      {error && (
        <div
          className="flex flex-col items-center justify-center gap-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 md:flex-row md:justify-between"
          role="alert"
        >
          <div className="flex gap-2">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>

          <Link
            href="/serie/create"
            replace
            className="text-end md:right-2"
            role="button"
          >
            Try again
          </Link>
        </div>
      )}
      <div className="mx-auto mt-10 max-w-72 flex-grow overflow-y-auto px-4 py-2 md:max-w-md">
        <SerieForm action={serverActionToCreateSerie} />
      </div>
    </div>
  );
}
