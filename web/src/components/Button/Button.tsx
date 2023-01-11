import { type ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: IButtonProps) => {
  return (
    <button
      className='border-2 border-solid'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
