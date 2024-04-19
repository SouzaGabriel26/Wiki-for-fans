export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 overflow-hidden p-4">
      <h1 className="text-center text-2xl">Loading...</h1>
      <div className="h-[300px] w-[200px] animate-pulse rounded-md bg-slate-300"></div>
    </div>
  );
}
