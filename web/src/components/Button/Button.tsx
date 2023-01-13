import { type HTMLProps } from 'react';

interface IButtonProps extends HTMLProps<HTMLButtonElement> {}

const Button = ({ children, onClick, className, style }: IButtonProps) => {
  return (
    <button
      className={`rounded-md p-2 font-medium text-sm inline-block text-center  shadow-md  ${
        className ? className : ''
      }`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
