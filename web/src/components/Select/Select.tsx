import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';

export interface ISelectProps {
  options: Option[];
  placeholder?: string;
  defaultValue?: string | number;
  className?: string;
  onChange?: (value: string | number) => void;
}

export type Option = { value: string | number; label: string; disabled?: boolean };

const Select = ({ options, defaultValue, className, placeholder, onChange }: ISelectProps) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [value, setValue] = useState(defaultValue ? defaultValue : -1);
  const [label, setLabel] = useState('');
  const handleOnClick = (value: number | string, label: string) => {
    setValue(value);
    setLabel(label);
    setIsShowDropdown(false);
  };

  useEffect(() => {
    if (value) {
      onChange?.(value);
    }
  }, [value]);

  return (
    <div className={`relative ${className ? className : ''}`}>
      <div
        className='flex border-2 relative h-7'
        onClick={() => setIsShowDropdown((prev) => !prev)}
      >
        {label ? <span>{label}</span> : <span>{placeholder}</span>}
        <span>
          <ChevronDownIcon
            style={{ width: 20, height: 20, top: 1, right: 2 }}
            className='absolute'
          />
        </span>
      </div>
      {isShowDropdown && (
        <div
          className='border-2 max-h-40 absolute w-full bg-slate-300'
          onChangeCapture={() => setIsShowDropdown(false)}
        >
          {options.length === 0 ? (
            <div>No data found</div>
          ) : (
            <div>
              {options.map((option: Option) => (
                <div
                  key={option.value}
                  className='h-6'
                  onClick={() => handleOnClick(option.value, option.label)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
