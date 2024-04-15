import { cn } from '@/lib/cn';

type WrapperProps = {
  children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={cn(
        'mx-auto flex h-full w-full max-w-5xl flex-col rounded-md bg-white shadow-xl md:my-10 md:max-h-[80%]',
        className,
      )}
    >
      {children}
    </div>
  );
}
