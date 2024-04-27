import Link from 'next/link';

import { NavigateBack } from '@/components/NavigateBack';
import { createSerieDatasource } from '@/data/serie';
import { cn } from '@/lib/cn';

type Params = {
  params: {
    serieId: string;
  };
};

export default async function Page({ params }: Params) {
  const serieDataSource = createSerieDatasource();
  const { returnedSerie } = await serieDataSource.getById(params.serieId);

  const statusColor =
    returnedSerie.status === 'FINISHED'
      ? 'border-green-500 bg-green-100'
      : returnedSerie.status === 'CANCELED'
        ? 'border-red-500 bg-red-100'
        : 'border-yellow-500 bg-yellow-100';

  return (
    <div className="relative space-y-2 p-4 text-center">
      <NavigateBack className="absolute left-1 top-1 hover:underline md:left-5 md:top-4" />

      <h1 className="mb-4 text-2xl">{returnedSerie.name}</h1>

      <div>
        <strong>Description</strong>
        <p>{returnedSerie.description}</p>
      </div>

      <div>
        <strong>Episodes</strong>
        <p>{returnedSerie.episodes}</p>
      </div>

      <div>
        <strong>Seasons</strong>
        <p>{returnedSerie.seasons}</p>
      </div>

      <div>
        <strong>Platforms</strong>
        <p>{returnedSerie.platforms}</p>
      </div>

      <div>
        <strong>Status</strong>
        <p className={cn(`mx-auto w-fit rounded border px-2`, statusColor)}>
          {returnedSerie.status}
        </p>
      </div>

      <div>
        <strong>Number of Characters registered</strong>
        <p>{returnedSerie.characters.length}</p>
        <Link href={`/?serieId=${params.serieId}`} className="text-xs">
          See characters page
        </Link>
      </div>
    </div>
  );
}
