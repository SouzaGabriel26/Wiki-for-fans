import Link from 'next/link';
import React from 'react';

import CharacterIcon from './CharacterIcon';
import SerieIcon from './SerieIcon';
import { Tooltip } from './Tooltip';

export default function CallToActions() {
  return (
    <div className="fixed bottom-2 right-5 flex flex-col items-center justify-center gap-2 md:absolute">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <Tooltip
            tip={action.tooltip}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-500 p-2 text-center text-2xl transition-colors hover:bg-slate-600"
            content_classes="animate-show-content-left top-1/4 -left-[110px] font-bold text-start"
          >
            {action.content}
          </Tooltip>
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
