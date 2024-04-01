import { Card } from './components/Card';
import { Header } from './components/Header';
import { Wrapper } from './components/Wrapper';

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <Wrapper>
        <main className="flex flex-grow flex-col items-center justify-center">
          <div className="grid w-full place-items-center justify-center gap-4 overflow-y-auto p-6 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} />
            ))}
          </div>
        </main>
      </Wrapper>
    </div>
  );
}
