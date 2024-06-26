import { cn } from '@/lib/cn';

type ModalProps = JSX.IntrinsicElements['dialog'] & {
  contentWidth?: string;
};

export default function Modal({
  children,
  className,
  contentWidth,
  ...props
}: ModalProps) {
  return (
    <dialog
      open
      className={cn(
        'absolute top-0 flex h-screen w-screen items-center justify-center bg-[#333]/60',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'relative flex w-64 max-w-md flex-col space-y-3 rounded-md bg-slate-50 px-4 py-2 text-center',
          contentWidth,
        )}
      >
        {children}
      </div>
    </dialog>
  );
}
