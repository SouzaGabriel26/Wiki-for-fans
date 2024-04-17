import { cn } from '@/lib/cn';

type TooltipProps = {
  children: React.ReactNode;
  tip: string;
  content_classes?: string;
} & JSX.IntrinsicElements['div'];

export function Tooltip({
  children,
  tip,
  className,
  content_classes,
}: TooltipProps) {
  return (
    <div className={cn('group relative', className)}>
      {children}
      <p
        className={cn(
          'absolute -top-6 left-0 right-0 hidden animate-show-content-up rounded-md p-2 text-center text-xs group-hover:flex',
          content_classes,
        )}
      >
        {tip}
      </p>
    </div>
  );
}
