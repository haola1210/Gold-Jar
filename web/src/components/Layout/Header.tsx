import React, { useRef } from 'react';
import { BarIcon } from '@assets';
import Modal, { ModalRef } from '@components/Modal';
import SideBar from '@components/SideBar';

function Header() {

  const modal = useRef<ModalRef>(null);

  return (
    <div className='w-full p-2 bg-indigo-400'>
      <BarIcon className='text-lg text-white' onClick={() => modal.current?.toggleModal()} />
      <Modal
        ref={modal}
        domNode={document.getElementById('header-menu') as HTMLElement}
        component={<SideBar />}
      />
    </div>
  );
}

export default Header;