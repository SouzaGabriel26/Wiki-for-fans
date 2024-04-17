'use client';

import { useRouter } from 'next/navigation';

type NavigateBackProps = JSX.IntrinsicElements['button'];

export function NavigateBack({ children, ...props }: NavigateBackProps) {
  const router = useRouter();

  return (
    <button {...props} onClick={() => router.back()}>
      {children ?? 'Back'}
    </button>
  );
}
