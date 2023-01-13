// Import AvatarIcon from '@assets/AvatarIcon';
import LogoFull from '@assets/LogoFull';
import { type ReactNode } from 'react';

const LoginLayout = (props: { children: ReactNode; className?: string }) => {
  return (
    <div className='relative h-full w-full'>
      <div className='w-full h-full flex flex-col items-center'>
        <LogoFull />
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;
