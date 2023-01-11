import { type ChangeEvent, type ReactNode } from 'react';

export interface IInputProps {
  label?: ReactNode;
  type?: 'text' | 'password';
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type = 'text', name = '', onChange }: IInputProps) => {
  return (
    <div className='my-2'>
      {label && <div className='mb-2'>{label}</div>}
      <div>
        <input
          className={`
        block w-full border rounded-md px-2 py-1
      `}
          type={type}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
