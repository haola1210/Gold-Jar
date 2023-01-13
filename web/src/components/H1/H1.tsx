import { type ReactNode } from 'react';

interface IH1Props {
  children: ReactNode;
  className?: string;
}

const H1 = ({ children, className }: IH1Props) => {
  return <h1 className={`my-4 text-3xl font-bold ${className ? className : ``}`}>{children}</h1>;
};

export default H1;
