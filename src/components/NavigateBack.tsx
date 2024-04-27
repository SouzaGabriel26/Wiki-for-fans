'use client';

import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

type NavigateBackProps = JSX.IntrinsicElements['button'];

export function NavigateBack({ children, ...props }: NavigateBackProps) {
  const router = useRouter();
  const { pending } = useFormStatus();

  return (
    <button
      type="button"
      disabled={pending}
      {...props}
      onClick={() => router.back()}
    >
      {children ?? 'Back'}
    </button>
  );
}
