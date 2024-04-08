import { createCharacterDatasource } from '@/data/character';

import { CharactersList } from './components/CharactersList';
import { Header } from './components/Header';
import { Wrapper } from './components/Wrapper';

export default async function Home() {
  const characterDatasource = createCharacterDatasource();
  const { returnedCharacters } = await characterDatasource.getAll();

  return (
    <div className="flex h-full flex-col overflow-y-hidden bg-slate-200">
      <Header />
      <Wrapper>
        <main className="flex h-full flex-grow flex-col items-center justify-center">
          <CharactersList characters={returnedCharacters} />
        </main>
      </Wrapper>
    </div>
  );
}
