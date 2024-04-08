type TooltipProps = {
  children: React.ReactNode;
  tip: string;
};

export function Tooltip({ children, tip }: TooltipProps) {
  return (
    <div className="group relative">
      {children}
      <p className="absolute -top-6 left-0 right-0 hidden animate-show-content-up rounded-md p-2 text-center text-xs group-hover:block">
        {tip}
      </p>
    </div>
  );
}
