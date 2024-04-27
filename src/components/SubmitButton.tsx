'use client';

import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/cn';

type SubmitButtonProps = JSX.IntrinsicElements['button'];

export function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={cn(
        'cursor-pointer rounded bg-slate-500 px-2 text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children ?? 'Submit'}
    </button>
  );
}
