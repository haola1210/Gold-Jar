import React from 'react';
import { ReactComponent as BrandLogo } from '@assets/logo-final.svg';
import H1 from '@components/H1';

const LogoFull = () => {
  return (
    <div className='w-fit flex flex-col justify-center items-center py-16'>
      <BrandLogo style={{ width: 120, height: 120, paddingRight: 10 }} />
      <div className='text-center'>
        <H1 className='bg-clip-text bg-gradient-to-t from-green-400 to-blue-700 text-transparent'>
          D I N O T E
        </H1>
      </div>
    </div>
  );
};

export default LogoFull;
