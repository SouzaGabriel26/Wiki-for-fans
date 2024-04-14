export default function CharacterslistLoading() {
  return (
    <div className="grid h-full w-full grid-cols-4 place-items-center justify-center gap-6 px-6 pb-20 pt-6 md:pb-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-slate-400 md:h-[200px] md:w-[150px]"
        ></div>
      ))}
    </div>
  );
}
