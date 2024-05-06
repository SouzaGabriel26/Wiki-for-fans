import Link from 'next/link';

import { Card } from '@/components/Card';
import { Tooltip } from '@/components/Tooltip';
import { createCharacterDatasource } from '@/data/character';
import { cn } from '@/lib/cn';

import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

type CharactersListProps = {
  serieId: string;
  visibility?: 'card' | 'list';
};

export async function CharactersList({
  serieId,
  visibility = 'card',
}: CharactersListProps) {
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

  if (visibility === 'list') {
    return (
      <div className="flex h-full w-full flex-col gap-1 px-6 py-2 md:px-16">
        {characters.map((character) => (
          <div
            key={character.id}
            className="relative flex w-full gap-4 rounded-md bg-slate-100 p-4"
          >
            <div className="flex flex-col">
              <strong>
                <Link href={`/character/${character.id}`} title="see more">
                  {character.name}
                </Link>
              </strong>

              <span>{character.nickName}</span>
            </div>

            <p>{character.serie.name}</p>

            <div className="right-2 flex gap-2 md:absolute">
              <Link href={`/character/edit/${character.id}`}>
                <EditIcon className="transition-transform hover:scale-105" />
              </Link>
              <Link
                href={{
                  pathname: `/character/delete/${character.id}`,
                  query: { name: character.name },
                }}
              >
                <TrashIcon className="transition-transform hover:scale-105" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

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
