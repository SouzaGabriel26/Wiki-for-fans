import Link from 'next/link';
import { Suspense } from 'react';

import CallToActions from '@/components/CallToActions';
import { CharactersList } from '@/components/CharactersList';
import CharacterslistLoading from '@/components/CharacterslistLoading';
import { Header } from '@/components/Header';
import { SeriesNavigation } from '@/components/SeriesNavigation';
import { Wrapper } from '@/components/Wrapper';
import { cn } from '@/lib/cn';

type HomeProps = {
  searchParams?: {
    serieId: string;
    visibility?: 'card' | 'list';
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const serieId = searchParams?.serieId;
  const visibility = searchParams?.visibility ?? 'card';

  return (
    <div className="flex h-full flex-col overflow-y-hidden bg-slate-200">
      <Header />
      <Wrapper className="relative md:py-4">
        <SeriesNavigation serieId={serieId ?? ''} />

        {serieId && (
          <div className="mx-auto mb-2 w-fit space-x-2 rounded bg-slate-300 px-2 py-1">
            <Link
              href={`/?serieId=${serieId}&visibility=card`}
              className={cn(
                visibility === 'card' && 'bg-slate-100',
                'rounded px-2 transition-colors hover:bg-slate-100',
              )}
            >
              Card
            </Link>
            <Link
              href={`/?serieId=${serieId}&visibility=list`}
              className={cn(
                visibility === 'list' && 'bg-slate-100',
                'rounded px-2 transition-colors hover:bg-slate-100',
              )}
            >
              List
            </Link>
          </div>
        )}
        <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
          {!serieId ? (
            <p className="text-center">
              If you want to see the characters of a serie, click on the serie
              name
            </p>
          ) : (
            <Suspense fallback={<CharacterslistLoading />}>
              <CharactersList serieId={serieId} visibility={visibility} />
            </Suspense>
          )}
        </main>

        <CallToActions />
      </Wrapper>
    </div>
  );
}
