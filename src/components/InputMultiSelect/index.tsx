'use client';

import { useCallback, useEffect, useState } from 'react';

import { Option } from './Option';
import { SmallScreenAddBtn } from './SmallScreenBtn';
import Input from '../Input';

type InputMultiSelectProps = {
  id: string;
  name: string;
  placeholder: string;
};

export default function InputMultiSelect({
  id,
  name,
  placeholder,
}: InputMultiSelectProps) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    options.length === 10 ? setIsDisabled(true) : setIsDisabled(false);
  }, [options]);

  const handleAddOption = useCallback(
    (inputValue: string) => {
      if (options.includes(inputValue.toLowerCase())) return;

      setOptions((prevOptions) => [...prevOptions, inputValue.toLowerCase()]);
    },
    [options],
  );

  function handleKeyDown(event: React.KeyboardEvent<Element>) {
    if (!inputValue) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        handleAddOption(inputValue);
        setInputValue('');
        event.preventDefault();
    }
  }

  function handleAddOptionFromButton() {
    if (!inputValue) return;

    handleAddOption(inputValue);
    setInputValue('');
  }

  function handleDeleteOption(option: string) {
    setOptions((prevOptions) =>
      prevOptions.filter((prevOption) => prevOption !== option),
    );
  }

  return (
    <div>
      <label htmlFor={id} className="ml-1 text-xs text-slate-400">
        press Enter or Tab to add a option
      </label>
      <Input
        value={inputValue}
        id={id}
        name={name}
        disabled={isDisabled}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={(event) => setInputValue(event.target.value)}
        className={isDisabled ? 'cursor-not-allowed' : ''}
      />
      <input
        type="hidden"
        name={`${name}Array`}
        value={JSON.stringify(options)}
      />

      <SmallScreenAddBtn
        disabled={inputValue === '' || isDisabled}
        onClick={handleAddOptionFromButton}
      />

      {options.length === 10 && (
        <p className="text-xs text-red-500">
          You can only add up to 10 options
        </p>
      )}

      <div className="relative flex max-w-full flex-wrap gap-1 rounded-md p-2">
        {options.map((option) => (
          <Option option={option} key={option} onDelete={handleDeleteOption} />
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
