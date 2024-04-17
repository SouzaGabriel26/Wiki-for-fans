import { NavigateBack } from '@/components/NavigateBack';

export default function Page() {
  return (
    <div className="flex gap-4 bg-slate-600 text-white">
      <NavigateBack className="hover:underline" />
      <h1>Create character page</h1>
    </div>
  );
}
