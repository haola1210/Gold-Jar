import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { type HTMLProps, useState } from 'react';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  type?: 'text' | 'password';
}

const Input = ({
  placeholder,
  type = 'text',
  name = '',
  onChange,
  className,
  value,
}: IInputProps) => {
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
    <>
      <div className='relative'>
        <input
          className={`
            block w-full border rounded-md px-4 py-2 ${className ? className : ''}
          `}
          type={returnType()}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
        {type === 'password' && (
          <>
            {isShowPassword ? (
              <EyeOffIcon
                style={{ width: 20, height: 20, top: 12, right: 10 }}
                onClick={() => setIsShowPassword(false)}
                className='absolute'
              />
            ) : (
              <EyeIcon
                style={{ width: 20, height: 20, top: 12, right: 10 }}
                onClick={() => setIsShowPassword(true)}
                className='absolute'
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Input;
