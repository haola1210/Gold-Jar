import AvatarIcon from '@assets/AvatarIcon';
import { type ReactNode } from 'react';

const LoginLayout = (props: { children: ReactNode; className?: string }) => {
  return (
    <div>
      <div className='flex justify-center p-8'>
        <AvatarIcon style={{ width: 120, height: 120 }}></AvatarIcon>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default LoginLayout;
