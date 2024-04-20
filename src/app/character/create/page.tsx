import { NavigateBack } from '@/components/NavigateBack';

import CharacterForm from './components/CharacterForm';

export default function Page() {
  return (
    <div className="flex h-full flex-col p-4">
      <NavigateBack className="absolute left-1 top-1 hover:underline md:left-5 md:top-4" />
      <h1 className="text-center text-2xl text-slate-800">
        Register a character
      </h1>

      <div className="mx-auto mt-10 max-w-64 flex-grow md:max-w-md">
        <CharacterForm />
      </div>
    </div>
  );
}
