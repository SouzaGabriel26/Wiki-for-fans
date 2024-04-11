'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Serie } from '@/data/serie';
import { cn } from '@/lib/cn';

type SeriesNavigationProps = {
  series: Serie[];
};

export function SeriesNavigation({ series }: SeriesNavigationProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const searchParams = useSearchParams();
  const serieId = searchParams.get('serieId');

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  if (series.length === 0) {
    return;
  }

  if (series.length > 7 || width < 768) {
    return (
      <div id="show-series" className="w-full py-4 md:py-6">
        <label
          className="flex cursor-pointer items-center justify-center text-center text-slate-600 transition-colors hover:text-slate-800"
          htmlFor="series-dialog"
        >
          Show series{' '}
        </label>
        <input type="checkbox" hidden id="series-dialog" />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              div#show-series:has(input[type='checkbox']:checked) dialog {
                display: block;
              }
            `,
          }}
        />

        <div className="relative">
          <dialog
            className="absolute z-10 rounded-md bg-slate-200 p-4 md:-right-40"
            open={true}
            aria-labelledby="series-dialog"
            hidden
          >
            <nav className="flex flex-col items-center justify-center pt-6">
              {series.map((serie) => (
                <Link
                  key={serie.id}
                  href={`/?serieId=${serie.id}`}
                  onClick={() => {
                    document.getElementById('series-dialog')?.click();
                  }}
                  className={cn(
                    'animate-show-content-up px-4 py-2 text-slate-600 transition-colors hover:text-slate-800',
                    serieId === serie.id ? 'text-slate-900 underline' : '',
                  )}
                >
                  {serie.name}
                </Link>
              ))}
            </nav>
          </dialog>
        </div>
      </div>
    );
  }

  return (
    <nav className="flex items-center justify-center pt-6">
      {series.map((serie) => (
        <Link
          key={serie.id}
          href={`/?serieId=${serie.id}`}
          className={cn(
            'animate-show-content-up px-4 py-2 text-slate-600 transition-colors hover:text-slate-800',
            serieId === serie.id ? 'text-slate-900 underline' : '',
          )}
        >
          {serie.name}
        </Link>
      ))}
    </nav>
  );
}
