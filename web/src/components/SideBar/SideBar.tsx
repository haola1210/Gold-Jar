import React from 'react';
import { useModalContext } from '@components/Modal';
import { NavLink } from 'react-router-dom';
import BackArrowIcon from '@assets/BackArrowIcon';
import AvatarIcon from '@assets/AvatarIcon';

type MenuItem = { to: string; name: string };

const SideBar = () => {
  const modalContext = useModalContext();

  const closeModal = () => {
    modalContext?.toggle();
  };

  const nav: MenuItem[] = [
    {
      to: 'income',
      name: 'Quản lý thu',
    },
    {
      to: 'spending',
      name: 'Quản lý chi',
    },
  ];

  const renderNavItem = () => {
    return (
      <div className='flex flex-col gap-4 w-full'>
        {nav.map((item: MenuItem, i) => (
          <NavLink
            to={item.to}
            style={({ isActive }) =>
              isActive
                ? {
                    background: '#00ff6a78',
                  }
                : undefined
            }
            key={i}
            className='rounded-md p-2 font-medium text-sm inline-block text-center text-black-800 shadow-md  bg-zinc-200 w-full'
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    );
  };

  const returnSessionOfDate = () => {
    const date = new Date();
    let session = '';
    if (date.getHours() >= 6 && date.getHours() < 12) {
      session = 'sáng';
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
      session = 'chiều';
    } else {
      session = 'tối';
    }

    return session;
  };

  return (
    <div
      className='h-screen w-screen flex'
      onClick={closeModal}
    >
      {/* left (content) */}
      <div
        className='px-4 py-5 bg-orange-500 flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-4'>
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
      >
        <BackArrowIcon style={{ width: 40, height: 40 }} />
      </div>
    </div>
  );
};

export default SideBar;
