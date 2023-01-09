import React from 'react';
import { useModalContext } from '@components/Modal';
import { NavLink } from 'react-router-dom';
import BackArrowIcon from '@assets/BackArrowIcon';
import AvatarIcon from '@assets/AvatarIcon';
import { returnSessionOfDate } from './utils';
import { navLinks } from '@consts/links';

const navLinkBaseClass =
  'rounded-md p-2 font-medium text-sm inline-block text-center text-black-800 shadow-md  bg-zinc-200 w-full';

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
              isActive ? navLinkBaseClass + ' bg-lime-400' : navLinkBaseClass
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
      <div className='px-4 py-5 bg-orange-400 flex flex-col'>
        <div className='mb-16'>
          <div className='flex gap-2 items-center'>
            <AvatarIcon style={{ width: 40, height: 40 }} />
            <span>Vo Van Hao</span>
          </div>
          <div>Chào buổi {returnSessionOfDate()},bạn khoẻ hông ?</div>
        </div>

        {/* css cho dep xiu */}
        {/* render nhung tab khac nek */}

        {renderNavItem()}
      </div>
      {/* right (mask) */}
      <div
        className='grow flex justify-end'
        style={{ backgroundColor: 'rgba(250, 250, 250, 0.4)' }}
        onClick={closeModal}
      >
        <BackArrowIcon style={{ width: 40, height: 40 }} />
      </div>
    </div>
  );
};

export default SideBar;
