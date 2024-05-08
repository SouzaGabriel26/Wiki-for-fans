import Link from 'next/link';

import { GoogleButton } from './GoogleSignInButton';

type HeaderProps = {
  title?: string;
};

export function Header({ title = 'Wiki for fans' }: HeaderProps) {
  return (
    <header className="relative bg-slate-800 p-4 text-white">
      <GoogleButton type="signout" />
      <h1 className="text-center text-2xl">
        {title === 'Wiki for fans' ? <Link href="/">{title}</Link> : title}
      </h1>
    </header>
  );
}
