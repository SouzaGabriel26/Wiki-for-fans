'use client';

import { useState } from 'react';

import { CloseModalIcon } from './CloseModalIcon';
import Input from './Input';

type InputMultiSelectProps = {
  id: string;
  name: string;
  placeholder: string;
};

export function InputMultiSelect({
  id,
  name,
  placeholder,
}: InputMultiSelectProps) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<Element>) {
    if (!inputValue || options.length >= 10) return;
    if (options.includes(inputValue)) return;

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setOptions([...options, inputValue]);
        setInputValue('');
        event.preventDefault();
    }
  }

  function handleAddOptionFromButton() {
    if (!inputValue || options.length >= 10) return;
    if (options.includes(inputValue)) return;

    setOptions([...options, inputValue]);
    setInputValue('');
  }

  function handleDeleteOption(option: string) {
    setOptions(options.filter((currentOption) => currentOption !== option));
  }

  return (
    <div>
      <Input
        value={inputValue}
        required
        id={id}
        name={name}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button
        type="button"
        disabled={inputValue === '' || options.length === 10}
        onClick={handleAddOptionFromButton}
        className="mt-2 rounded-md bg-slate-400 p-2 text-slate-800 disabled:bg-slate-300 disabled:text-slate-500 md:hidden"
      >
        Add
      </button>

      {options.length === 10 && (
        <p className="text-xs text-red-500">
          You can only add up to 10 options
        </p>
      )}

      <div className="relative flex max-w-full flex-wrap gap-1 rounded-md p-2">
        {options.map((option) => (
          <span
            key={option}
            className="relative mr-1 rounded-md border border-slate-500 bg-gray-200 p-1 pr-6"
          >
            {option}
            <button
              type="button"
              className="absolute right-1"
              onClick={() => handleDeleteOption(option)}
            >
              <CloseModalIcon className="w-4 rounded-full hover:scale-105" />
            </button>
          </span>
        ))}

        {options.length > 1 && (
          <button
            className="absolute -right-8 top-0 text-xs hover:scale-105"
            onClick={() => setOptions([])}
            type="button"
          >
            clear all
          </button>
        )}
      </div>
    </div>
  );
}
