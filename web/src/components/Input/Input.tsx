import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { useState, type ChangeEvent } from 'react';

export interface IInputProps {
  placeholder?: string;
  type?: 'text' | 'password';
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, type = 'text', name = '', onChange }: IInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const returnType = () => {
    if (type === 'text') {
      return 'text';
    }

    if (type === 'password') {
      if (isShowPassword) {
        return 'text';
      }

      return 'password';
    }
  };

  return (
    <div className='mt-2'>
      <div className='relative'>
        <input
          className={`
            block w-full border rounded-md px-2 py-1
          `}
          type={returnType()}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <span>
            {isShowPassword ? (
              <EyeOffIcon
                style={{ width: 20, height: 20, top: 8, right: 10 }}
                onClick={() => setIsShowPassword(false)}
                className='absolute'
              />
            ) : (
              <EyeIcon
                style={{ width: 20, height: 20, top: 8, right: 10 }}
                onClick={() => setIsShowPassword(true)}
                className='absolute'
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
