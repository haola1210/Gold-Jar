import React from 'react';
import { useModalContext } from '@components/Modal';
import { NavLink } from 'react-router-dom';
import BackArrowIcon from '@assets/BackArrowIcon';
import AvatarIcon from '@assets/AvatarIcon';
import { returnSessionOfDate } from './utils';
import { navLinks } from '@consts/links';

const navLinkBaseClass =
  'rounded-md p-2 font-medium text-sm inline-block text-center shadow-md w-full bg-gray-200 text-gray-600';

const SideBar = () => {
  const modalContext = useModalContext();

  const closeModal = () => {
    modalContext?.toggle();
  };

  const renderNavItem = () => {
    return (
      <div className='flex flex-col gap-4 w-full'>
        {navLinks.map((item, i) => (
          <NavLink
            to={item.to}
            key={i}
            className={({ isActive }) =>
              isActive ? navLinkBaseClass + ' !bg-lime-500 !text-gray-100' : navLinkBaseClass
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    );
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
          <div className='font-bold text-sm text-gray-400'>Chào buổi {returnSessionOfDate()}, bạn khoẻ hông ?</div>
        </div>

        {/* css cho dep xiu */}
        {/* render nhung tab khac nek */}

        {renderNavItem()}
      </div>
      {/* right (mask) */}
      <div
        className='grow flex justify-end'
        style={{ backgroundColor: 'rgba(39, 39, 39, 0.549)' }}
        onClick={closeModal}
      >
        {/* <BackArrowIcon style={{ width: 40, height: 40 }} /> */}
      </div>
    </div>
  );
};

export default SideBar;
