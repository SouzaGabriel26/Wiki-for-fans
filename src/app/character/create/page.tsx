import { NavigateBack } from '@/components/NavigateBack';

import CharacterForm from './components/CharacterForm';

export default function Page() {
  return (
    <div className="flex h-full flex-col p-4">
      <NavigateBack className="absolute left-5 top-4 hover:underline" />
      <h1 className="text-center text-2xl text-slate-800">
        Register a character
      </h1>

      <div className="mx-auto mt-10 max-w-64 flex-grow md:max-w-md">
        <CharacterForm />
      </div>
    </div>
  );
}
