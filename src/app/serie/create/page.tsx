import Link from 'next/link';

import { NavigateBack } from '@/components/NavigateBack';

import SerieForm from './components/SerieForm';

type Props = {
  searchParams: {
    error?: string;
  };
};

export default function Page({ searchParams }: Props) {
  const { error } = searchParams;

  return (
    <div className="flex h-full flex-col p-4">
      <NavigateBack className="absolute left-1 top-1 hover:underline md:left-5 md:top-5" />
      <h1 className="mt-5 animate-show-content-up text-center text-2xl text-slate-800 md:mt-0">
        Create serie page
      </h1>

      {error && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>

          <Link
            href="/serie/create"
            replace
            className="absolute bottom-0 right-1 text-end md:right-2"
            role="button"
          >
            Try again
          </Link>
        </div>
      )}
      <div className="mx-auto mt-10 max-w-72 flex-grow overflow-y-auto px-4 py-2 md:max-w-md">
        <SerieForm />
      </div>
    </div>
  );
}
