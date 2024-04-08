import { CharactersList } from './components/CharactersList';
import { Header } from './components/Header';
import { Wrapper } from './components/Wrapper';
import { character } from './models/character';

export default async function Home() {
  const { returnedCharacters } = await character.getAll();

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
