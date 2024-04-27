import Link from 'next/link';

import { createSerieDatasource } from '@/data/serie';
import { cn } from '@/lib/cn';

type SeriesNavigationProps = {
  serieId: string;
};

export async function SeriesNavigation({ serieId }: SeriesNavigationProps) {
  const serieDatasource = createSerieDatasource();
  const { returnedSeries: series } = await serieDatasource.getAll();

  if (series.length === 0) {
    return;
  }

  const choosedSerie = series.find((serie) => serie.id == serieId);

  return (
    <>
      <nav className="mb-4 hidden flex-col items-center justify-center gap-4 md:flex">
        <div>
          {series.map((serie) => (
            <Link
              key={serie.id}
              href={{
                pathname: '/',
                query: { serieId: serie.id },
              }}
              className="animate-show-content-up px-4 py-2 text-slate-600 transition-colors hover:text-slate-800"
            >
              <button
                className={cn(
                  serieId === serie.id && 'text-slate-900 underline',
                )}
              >
                {serie.name}
              </button>
            </Link>
          ))}
        </div>

        <SeeMoreAboutSerie />
      </nav>

      <div className="mb-8 mt-2 flex w-full flex-col items-center justify-center gap-2 md:hidden">
        <Link href="/series-list" className="text-slate-800">
          Show series
        </Link>

        <SeeMoreAboutSerie />
      </div>
    </>
  );

  function SeeMoreAboutSerie() {
    if (!choosedSerie) {
      return null;
    }

    return (
      <Link
        className="text-xs text-slate-600 transition-colors hover:text-slate-800"
        href={`/serie/${choosedSerie.id}`}
      >
        see more about <strong>{choosedSerie.name}</strong>
      </Link>
    );
  }
}
