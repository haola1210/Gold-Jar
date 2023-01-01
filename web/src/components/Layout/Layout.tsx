import React, { HTMLAttributes } from 'react';
import Header from './Header';

interface ILayout extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element
}

function Layout({ children, className, ...rest }: ILayout) {

  return (
    <div 
      className={'w-full h-full flex flex-col ' + className || ''}
      {...rest}
    >
      <div>
        <Header />
      </div>
      
      <div className='flex-grow overflow-y-scroll '>
        { children }
      </div>
    </div>
  );
}

export default Layout;