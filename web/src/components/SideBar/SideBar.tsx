import React from 'react';
import { useModalContext } from '@components/Modal';
import AvatarIcon from '@assets/AvatarIcon';
import { returnSessionOfDate } from './utils';
import { navLinks } from '@consts/links';
import NavBar from '@components/NavBar';

const SideBar = () => {
  const modalContext = useModalContext();

  const closeModal = () => {
    modalContext?.toggle();
  };

  return (
    <div className='h-screen w-screen flex'>
      {/* left (content) */}
      <div className='px-4 py-5 bg-zinc-50 flex flex-col'>
        <div className='mb-16'>
          <div className='flex gap-4 items-center pb-2'>
            <AvatarIcon
              style={{ width: 40, height: 40 }}
              className={'bg-zinc-50 p-1 rounded-full ring-4 ring-offset-2 ring-lime-400 '}
            />
            <span className='font-bold text-lg text-gray-700'>Vo Van Hao</span>
          </div>
          <div className='font-bold text-sm text-gray-400'>
            Chào buổi {returnSessionOfDate()}, bạn khoẻ hông ?
          </div>
        </div>

        <NavBar
          links={navLinks}
          row={false}
          childClass='rounded-lg !p-2'
        />
      </div>
      {/* right (mask) */}
      <div
        className='grow flex justify-end'
        style={{ backgroundColor: 'rgba(39, 39, 39, 0.549)' }}
        onClick={closeModal}
      ></div>
    </div>
  );
};

export default SideBar;
