import { Card } from '@/components/Card';
import { Tooltip } from '@/components/Tooltip';
import { createCharacterDatasource } from '@/data/character';
import { cn } from '@/lib/cn';

type CharactersListProps = {
  serieId: string;
};

export async function CharactersList({ serieId }: CharactersListProps) {
  const characterDatasource = createCharacterDatasource();
  const { returnedCharacters: characters } =
    await characterDatasource.getAllBySerieId(serieId);

  const charactersCount = characters.length;

  const grid = charactersCount > 4 ? 4 : charactersCount;

  if (charactersCount === 0)
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-2xl font-semibold text-slate-600">
          No characters found
        </p>
      </div>
    );

  return (
    <div
      className={cn(
        'grid h-full w-full place-items-center justify-center gap-6 px-6 pb-20 pt-6 md:pb-6',
        {
          'md:grid-cols-1': grid === 1,
          'md:grid-cols-2': grid === 2,
          'md:grid-cols-3': grid === 3,
          'md:grid-cols-4': grid === 4,
        },
      )}
    >
      {characters.length > 0 &&
        characters.map((character) => (
          <Tooltip
            key={character.id}
            tip={character.name}
            className="last:pb-20 md:last:pb-0"
          >
            <Card character={character} />
          </Tooltip>
        ))}
    </div>
  );
}