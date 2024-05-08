'use client';

import { signOut } from 'next-auth/react';

import { cn } from '@/lib/cn';

import { LogoutIcon } from './icons/LogoutIcon';

type SignOutButtonPorps = JSX.IntrinsicElements['button'];

export function SignOutButton({ className, ...props }: SignOutButtonPorps) {
  function handleClick() {
    signOut();
  }

  return (
    <button
      title="exit"
      onClick={handleClick}
      className={cn('flex items-center gap-2 text-sm', className)}
      {...props}
    >
      <LogoutIcon />
      <span className="hidden md:block">Sign out</span>
    </button>
  );
}
