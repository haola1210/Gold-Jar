import React from 'react';
import { useModalContext } from '@components/Modal';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const modalContext = useModalContext();

  return (
    <div className='h-screen w-screen flex'>
      {/* left (content) */}
      <div className='px-4 py-5 bg-orange-500'>
        <div>Avatar nek va Name nek</div>
        <div>dong xin chao nho nho nek</div>

        {/* css cho dep xiu */}
        {/* render nhung tab khac nek */}
        <NavLink
          to='income'
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'red',
                }
              : undefined
          }
        >
          Quản lí thu
        </NavLink>
        <NavLink
          to='spending'
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'red',
                }
              : undefined
          }
        >
          Quản lí chi
        </NavLink>
      </div>
      {/* right (mask) */}
      <div
        className='grow'
        style={{ backgroundColor: 'rgba(250, 250, 250, 0.4)' }}
      >
        <div onClick={() => modalContext?.toggle()}>close side bar ICON</div>
      </div>
    </div>
  );
};

export default SideBar;
