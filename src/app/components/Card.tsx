import Image from 'next/image';

import { cn } from '@/lib/cn';

import { Character } from '../data/character';

type CardProps = {
  character: Character;
};

export function Card({ character }: CardProps) {
  return (
    <div
      tabIndex={0}
      aria-label={character.name}
      className="group mx-auto max-w-sm rounded-md bg-slate-500 px-6 py-4 shadow-md shadow-black/65 md:p-2"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="text-center">
          <h2 className="mx-auto mb-2 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold text-white md:max-w-[150px]">
            {character.name}
          </h2>
          <p className="text-gray-300">{character.nickName}</p>
        </div>
        <div
          className={cn(
            'relative mx-auto mt-4 h-[270px] w-[200px] transition-transform duration-300 ease-in-out group-hover:scale-105',
            'md:h-[200px] md:w-[150px]',
          )}
        >
          <Image
            className="rounded-md"
            src={character.image}
            alt={character.name}
            priority
            fill
            sizes="100%"
          />
        </div>
      </div>
    </div>
  );
}
