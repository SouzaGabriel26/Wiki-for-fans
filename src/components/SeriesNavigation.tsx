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

  return (
    <>
      <nav className="hidden items-center justify-center pt-6 md:flex">
        {series.map((serie) => (
          <Link
            key={serie.id}
            href={{
              pathname: '/',
              query: { serieId: serie.id },
            }}
            className={cn(
              'animate-show-content-up px-4 py-2 text-slate-600 transition-colors hover:text-slate-800',
              serieId === serie.id ? 'text-slate-900 underline' : '',
            )}
          >
            <button>{serie.name}</button>
          </Link>
        ))}
      </nav>

      <div className="mt-2 flex w-full items-center justify-center md:hidden">
        <Link href="/series-list" className="text-slate-800">
          Show series
        </Link>
      </div>
    </>
  );
}
