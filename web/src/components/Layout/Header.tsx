import React, { useState } from 'react';
import { BarIcon } from '@assets';
import Modal from '@components/Modal';

function Header() {

  const [shouldOpenSideBar, toggleSideBar] = useState(false);
  const toggle = () => toggleSideBar(prev => !prev);

  return (
    <div className='w-full p-2 bg-indigo-400'>
      <BarIcon className='text-lg text-white' />
      <Modal 
        isOpen={shouldOpenSideBar} 
        toggle={toggle} 
        domNode={document.getElementById('header-menu') as HTMLElement}
      >
        <div>test</div>
      </Modal>
    </div>
  );
}

export default Header;