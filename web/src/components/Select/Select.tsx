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
        className={`flex border-2 relative block w-full border rounded-md px-4 py-2 ${
          isShowDropdown ? '!rounded-b-none' : ''
        }`}
        onClick={() => setIsShowDropdown((prev) => !prev)}
      >
        {label ? <span>{label}</span> : <span className='text-slate-400'>{placeholder}</span>}
        <span>
          <ChevronDownIcon
            style={{ width: 20, height: 20, top: '22%', right: '3%' }}
            className='absolute'
          />
        </span>
      </div>
      {isShowDropdown && (
        <div
          className='border-2 max-h-40 absolute w-full'
          onChangeCapture={() => setIsShowDropdown(false)}
          style={{ zIndex: 10000 }}
        >
          {options.length === 0 ? (
            <div>No data found</div>
          ) : (
            <div>
              {options.map((option: Option) => (
                <div
                  key={option.value}
                  className={`flex items-center h-10 pl-4 bg-white ${
                    value === option.value ? `bg-sky-200` : ``
                  }`}
                  onClick={() => handleOnClick(option.value, option.label)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isShowDropdown && (
        <div
          className='w-screen h-screen fixed'
          onClick={() => setIsShowDropdown(false)}
          style={{ top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: 999 }}
        ></div>
      )}
    </div>
  );
};

export default Select;
