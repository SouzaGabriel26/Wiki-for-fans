import Link from 'next/link';

import { NavigateBack } from '@/components/NavigateBack';

import CharacterForm from './components/CharacterForm';

type Props = {
  searchParams: {
    error?: string;
  };
};

export default function Page({ searchParams }: Props) {
  return (
    <div className="flex h-full flex-col p-4">
      <NavigateBack className="absolute left-1 top-1 hover:underline md:left-5 md:top-4" />
      <h1 className="mt-5 animate-show-content-up text-center text-2xl text-slate-800 md:mt-0">
        Register a character
      </h1>

      {searchParams.error === 'imgUpload' && (
        <div
          className="mt-4 flex flex-col items-center justify-between gap-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-center text-red-700 md:flex-row"
          role="alert"
        >
          <span>Image upload service temporarily unavailable!</span>

          <small className="text-xs">
            You can create a character without a image, and edit it after
          </small>

          <Link href="/character/create">Try again</Link>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-72 flex-grow overflow-y-auto px-4 py-2 md:max-w-md">
        <CharacterForm />
      </div>
    </div>
  );
}
