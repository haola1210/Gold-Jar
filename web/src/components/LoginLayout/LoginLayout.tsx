import AvatarIcon from '@assets/AvatarIcon';
import { type ReactNode } from 'react';

const LoginLayout = (props: { children: ReactNode; className?: string }) => {
  return (
    <div className='relative w-screen h-screen'>
      <div
        className='w-full h-full'
        style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
      >
        <div className='flex justify-center p-8'>
          <AvatarIcon style={{ width: 120, height: 120 }}></AvatarIcon>
        </div>
        <div>{props.children}</div>
      </div>
      <div
        style={{
          backgroundImage: 'url("src/assets/background-login.png")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
        className='absolute w-full h-full top-0 left-0'
      />
    </div>
  );
};

export default LoginLayout;
