import Image from 'next/image';
import Link from 'next/link';

import { NavigateBack } from '@/components/NavigateBack';
import { Wrapper } from '@/components/Wrapper';
import { createCharacterDatasource } from '@/data/character';

type Params = {
  params: {
    characterId: string;
  };
};

export default async function Page({ params }: Params) {
  const characterDatasource = createCharacterDatasource();
  const { returnedCharacter } = await characterDatasource.getById(
    params.characterId,
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-200">
      <Wrapper className="relative">
        <NavigateBack className="absolute left-10 top-10 hover:underline" />
        <SerieCTA />
        <div className="flex flex-col items-center justify-center gap-4 overflow-hidden p-4">
          <h1 className="text-center text-2xl">{returnedCharacter.name}</h1>
          {returnedCharacter.isProtagonist && (
            <div className="rounded-md bg-green-100 px-2">
              <span className="text-sm text-slate-800">Protagonist 🌟</span>
            </div>
          )}
          <div className="relative">
            <Image
              className="h-auto max-h-[350px] w-auto max-w-[400px] rounded-md object-cover"
              src={returnedCharacter?.image ?? ''}
              alt={`${returnedCharacter.nickName} image`}
              priority
              width={200}
              height={200}
            />
          </div>

          <div className="space-y-4 overflow-y-auto p-2 md:pr-8">
            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Nickname</span>
              <p className="font-bold">{returnedCharacter.nickName}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Description</span>
              <p className="max-w-xs text-center font-bold">
                {returnedCharacter.description}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Age</span>
              <p className="text-center font-bold">{returnedCharacter.age}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Personalities</span>
              <p className="max-w-xs text-center font-bold">
                {returnedCharacter.personalities?.join(', ') ??
                  'No personalities'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Friends</span>
              <p className="max-w-xs text-center font-bold">
                {returnedCharacter.friends?.join(', ') ?? 'No friends'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Enemies</span>
              <p className="max-w-xs text-center font-bold">
                {returnedCharacter.enemies?.join(', ') ?? 'No enemies'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Registered at</span>
              <p className="text-center font-bold">
                {
                  new Date(Number(returnedCharacter.createdAt))
                    .toISOString()
                    .split('T')[0]
                }
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-800">Favorite Phrase</span>
              <p className="max-w-xs text-center font-bold">
                {returnedCharacter?.favoritePhrase ?? 'No favorite phrase'}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );

  function SerieCTA() {
    return (
      <div className="absolute right-10 top-10 flex flex-col rounded-md bg-slate-200 p-2">
        <Link href="#">{returnedCharacter.serie.name}</Link>

        {returnedCharacter.serie.platforms.length > 0 && (
          <span className="text-center text-xs text-slate-600">
            {returnedCharacter.serie.platforms.join(', ')}
          </span>
        )}
      </div>
    );
  }
}
