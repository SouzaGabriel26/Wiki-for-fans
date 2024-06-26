import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { constants } from '@/config/constants';
import { Character } from '@/data/character';
import { cn } from '@/lib/cn';

import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

type CardProps = {
  character: Character;
};

export async function Card({ character }: CardProps) {
  const session = await getServerSession();

  return (
    <div
      tabIndex={0}
      aria-label={character.name}
      className="mx-auto max-w-sm rounded-md bg-slate-500 px-6 py-4 shadow-md shadow-black/65 md:p-3"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="text-center">
          <h2 className="mx-auto mb-2 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold text-white md:max-w-[150px]">
            {character.name}
          </h2>
          <div className="flex items-center justify-center gap-2">
            {session && (
              <Link
                href={`/character/edit/${character.id}`}
                className="transition-all hover:scale-110"
              >
                <EditIcon />
              </Link>
            )}
            <p className="text-gray-300">{character.nickName || '-'}</p>
            {session && (
              <Link
                href={{
                  pathname: `/character/delete/${character.id}`,
                  query: { name: character.name },
                }}
                className="transition-all hover:scale-110"
              >
                <TrashIcon />
              </Link>
            )}
          </div>
        </div>
        <Link
          href={`/character/${character.id}`}
          className={cn(
            'relative mx-auto mt-4 h-[270px] w-[200px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105',
            'md:h-[200px] md:w-[150px]',
          )}
        >
          <Image
            className="rounded-md object-cover"
            src={character?.image || constants.image_url_fallback}
            alt={character.name}
            priority
            fill
            sizes="100%"
          />
        </Link>
      </div>
      <div className="mt-4 h-2.5 md:mt-2">
        <p className="hidden animate-show-content-up text-center text-xs text-white group-hover:block">
          {character.serie.name}
        </p>
      </div>
    </div>
  );
}
