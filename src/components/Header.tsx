type HeaderProps = {
  title?: string;
};

export function Header({ title = 'Wiki for fans' }: HeaderProps) {
  return (
    <header className="bg-slate-800 p-4 text-white">
      <h1 className="text-center text-2xl">{title}</h1>
    </header>
  );
}
