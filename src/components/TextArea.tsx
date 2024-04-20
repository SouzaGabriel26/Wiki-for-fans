import { cn } from '@/lib/cn';

type TextAreaProps = {
  error?: string;
} & JSX.IntrinsicElements['textarea'];

export default function TextArea({
  id,
  name,
  placeholder,
  className,
  error,
  ...props
}: TextAreaProps) {
  const cols = props.cols ?? 30;
  const rows = props.rows ?? 5;

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        placeholder=" "
        className={cn(
          'peer w-full rounded-md border border-slate-500 bg-white px-2 pt-6 text-sm text-slate-700 outline-none placeholder-shown:pt-2 focus:border-slate-800',
          className,
        )}
      />
      <label
        htmlFor={id}
        className="absolute left-2 top-1.5 text-xs text-slate-400 transition-all peer-placeholder-shown:text-base"
      >
        {placeholder}
      </label>

      {error && <small className="pl-2 text-xs text-red-800">{error}</small>}
    </div>
  );
}
