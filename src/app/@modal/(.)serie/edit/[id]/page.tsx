import { Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateSerieArgs } from '@/app/api/configs/context/prismaMutations';
import SerieForm from '@/app/serie/components/SerieForm';
import Modal from '@/components/Modal';
import { NavigateBack } from '@/components/NavigateBack';
import { createSerieDatasource } from '@/data/serie';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const serieDataSource = createSerieDatasource();
  const { returnedSerie: serie } = await serieDataSource.getById(params.id);

  async function serverActionToUpdateSerie(formData: FormData) {
    'use server';

    const entries = Object.fromEntries(formData.entries());

    const updateSerieObject: CreateSerieArgs = {
      name: entries.name as string,
      description: entries.description as string,
      episodes: Number(entries.episodes),
      seasons: Number(entries.seasons),
      platforms: JSON.parse(entries.platformsArray as string),
      status: entries.status as Status,
    };

    const serieDataSource = createSerieDatasource();
    const { updatedSerie } = await serieDataSource.updateById(
      params.id,
      updateSerieObject,
    );

    if (updatedSerie) {
      revalidatePath(`/serie/${params.id}`);
      return redirect(`/serie/${params.id}`);
    }
  }

  return (
    <Modal contentWidth="w-full max-w-[380px]">
      <NavigateBack className="absolute left-2 top-1 transition-all hover:underline" />

      <h1>
        Edit Serie: <strong>{serie.name}</strong>
      </h1>

      <div className="px-4">
        <SerieForm action={serverActionToUpdateSerie} isEdit serie={serie} />
      </div>
    </Modal>
  );
}
