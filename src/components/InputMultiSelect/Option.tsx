import { CloseModalIcon } from '../CloseModalIcon';

type OptionProps = {
  option: string;
  onDelete(option: string): void;
};

export function Option({ option, onDelete }: OptionProps) {
  return (
    <span className="relative mr-1 rounded-md border border-slate-500 bg-gray-200 p-1 pr-6">
      {option}
      <button
        type="button"
        className="absolute right-1"
        onClick={() => onDelete(option)}
      >
        <CloseModalIcon className="w-4 rounded-full hover:scale-105" />
      </button>
    </span>
  );
}
