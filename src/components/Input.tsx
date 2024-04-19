import { cn } from '@/lib/cn';

type InputProps = {
  error?: string;
} & JSX.IntrinsicElements['input'];

export default function Input({
  id,
  className,
  placeholder,
  error,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        {...props}
        className={cn(
          'peer h-12 w-full rounded-md border border-slate-500 bg-white px-2 pt-4 text-sm text-slate-700 outline-none placeholder-shown:pt-0 focus:border-slate-800',
          className,
        )}
        placeholder=" "
      />
      <label
        className="absolute left-2 top-1 text-xs text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base"
        htmlFor={id}
      >
        {placeholder}
      </label>

      {error && <small className="pl-2 text-xs text-red-800">{error}</small>}
    </div>
  );
}
