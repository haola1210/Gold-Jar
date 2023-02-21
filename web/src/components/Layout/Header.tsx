import React, { useRef } from 'react';
import BarIcon from '@assets/BarIcon';
import Modal, { type ModalRef } from '@components/Modal';
import SideBar from '@components/SideBar';

function Header() {
  const modal = useRef<ModalRef>(null);

  return (
    <div className='w-full p-2 bg-indigo-400'>
      <BarIcon
        className='text-lg text-white'
        onClick={() => modal.current?.toggleModal()}
      />
      <Modal
        ref={modal}
        domNode={document.getElementById('header-menu')!}
        component={<SideBar />}
      />
    </div>
  );
}

export default Header;
