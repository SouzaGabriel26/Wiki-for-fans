import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { GoogleSignInButton } from './GoogleSignInButton';
import { SignOutButton } from './SignoutButton';

type HeaderProps = {
  title?: string;
};

export async function Header({ title = 'Wiki for fans' }: HeaderProps) {
  const session = await getServerSession();

  return (
    <header className="bg-slate-800 p-4 text-white">
      <div className="mx-auto flex max-w-screen-lg justify-between">
        <h1 className="text-2xl">
          {title === 'Wiki for fans' ? <Link href="/">{title}</Link> : title}
        </h1>
        {session ? (
          <SignOutButton />
        ) : (
          <GoogleSignInButton className="h-fit">Sign in</GoogleSignInButton>
        )}
      </div>
    </header>
  );
}
