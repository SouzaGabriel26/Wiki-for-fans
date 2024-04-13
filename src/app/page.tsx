import { CharactersList } from '@/components/CharactersList';
import { Header } from '@/components/Header';
import { SeriesNavigation } from '@/components/SeriesNavigation';
import { Wrapper } from '@/components/Wrapper';

type HomeProps = {
  searchParams?: {
    serieId: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const serieId = searchParams?.serieId;

  return (
    <div className="flex h-full flex-col overflow-y-hidden bg-slate-200">
      <Header />
      <Wrapper>
        <SeriesNavigation serieId={serieId ?? ''} />
        <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
          {!serieId ? (
            <p>
              If you want to see the characters of a serie, click on the serie
              name
            </p>
          ) : (
            <CharactersList serieId={serieId} />
          )}
        </main>
      </Wrapper>
    </div>
  );
}
