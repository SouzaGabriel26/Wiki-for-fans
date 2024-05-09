import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { Avatar } from './Avatar';
import { GoogleSignInButton } from './GoogleSignInButton';
import { InfoIcon } from './icons/InfoIcon';
import { SignOutButton } from './SignoutButton';

type HeaderProps = {
  title?: string;
};

export async function Header({ title = 'Wiki for fans' }: HeaderProps) {
  const session = await getServerSession();

  return (
    <header className="bg-slate-800 p-4 text-white">
      <div className="mx-auto flex max-w-screen-lg justify-between">
        {session && <Avatar url={session.user?.image} />}

        <div className="flex items-center gap-2">
          <h1 className="text-2xl">
            {title === 'Wiki for fans' ? <Link href="/">{title}</Link> : title}
          </h1>

          <Link href="/info" title="info">
            <InfoIcon className="transition-colors hover:fill-slate-300" />
          </Link>
        </div>

        {session ? (
          <SignOutButton />
        ) : (
          <GoogleSignInButton className="h-fit">Sign in</GoogleSignInButton>
        )}
      </div>
    </header>
  );
}
