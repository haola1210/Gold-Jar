import { type ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: IButtonProps) => {
  return (
    <button
      className={`rounded-md p-2 font-medium text-sm inline-block text-center  shadow-md  ${
        className ? className : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
