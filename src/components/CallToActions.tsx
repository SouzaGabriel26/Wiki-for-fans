import Link from 'next/link';
import React from 'react';

import CharacterIcon from './CharacterIcon';
import SerieIcon from './SerieIcon';

export default function CallToActions() {
  return (
    <div className="fixed bottom-2 right-3 flex flex-col items-center justify-center gap-2 md:absolute md:right-5">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="max-w group relative flex items-center justify-center"
        >
          <p className="absolute -left-[130px] w-[120px] text-end text-sm font-bold opacity-0 transition-all ease-in-out group-hover:opacity-100">
            {action.name}
          </p>
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-slate-500 p-2 text-center text-2xl transition-colors hover:bg-slate-600">
            {action.content}
          </div>
        </Link>
      ))}
    </div>
  );
}

const actions: ActionsType = [
  {
    name: 'create character',
    href: '/character/create',
    tooltip: 'create character',
    content: <CharacterIcon />,
  },
  {
    name: 'create serie',
    href: '/serie/create',
    tooltip: 'create serie',
    content: <SerieIcon />,
  },
];

type ActionsType = Array<{
  name: string;
  href: string;
  tooltip: string;
  content: string | React.ReactNode;
}>;
