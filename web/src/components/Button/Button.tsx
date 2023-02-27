import { type HTMLProps } from 'react';

interface IButtonProps extends HTMLProps<HTMLButtonElement> {}

const Button = ({ children, onClick, className, style, disabled }: IButtonProps) => {
  return (
    <button
      className={`rounded-md p-2 font-medium text-sm inline-block text-center  shadow-md  ${
        className ? className : ''
      } disabled:bg-slate-400`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
