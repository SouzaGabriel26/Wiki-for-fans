import { CloseModalIcon } from '../CloseModalIcon';

type OptionProps = {
  option: string;
  onDelete(option: string): void;
};

export function Option({ option, onDelete }: OptionProps) {
  return (
    <span className="relative mr-1.5 rounded-md border bg-gray-200 pl-1 pr-6 shadow">
      {option}
      <button
        type="button"
        className="absolute -top-0.5 right-1"
        onClick={() => onDelete(option)}
      >
        <CloseModalIcon className="w-4 rounded-full hover:scale-105" />
      </button>
    </span>
  );
}
