'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { cn } from '@/lib/cn';

import googleLogo from '../../public/assets/google.png';

type GoogleButtonProps = JSX.IntrinsicElements['button'];

export function GoogleSignInButton({
  className,
  children,
  ...props
}: GoogleButtonProps) {
  function handleClick() {
    signIn('google');
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'focus:shadow-outline border-slate flex h-14 w-fit items-center justify-center rounded-lg border bg-white px-2 py-1 text-sm font-semibold transition-all duration-300 hover:border-slate-200 hover:bg-slate-300',
        className,
      )}
      title="Sign in with Google"
      {...props}
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      {children && (
        <span className="ml-2 hidden text-slate-800 md:block">{children}</span>
      )}
    </button>
  );
}
