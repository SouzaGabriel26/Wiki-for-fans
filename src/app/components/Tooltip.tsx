import { cn } from '@/lib/cn';

type TooltipProps = {
  children: React.ReactNode;
  tip: string;
} & JSX.IntrinsicElements['div'];

export function Tooltip({ children, tip, className }: TooltipProps) {
  return (
    <div className={cn('group relative', className)}>
      {children}
      <p className="absolute -top-6 left-0 right-0 hidden animate-show-content-up rounded-md p-2 text-center text-xs group-hover:block">
        {tip}
      </p>
    </div>
  );
}
