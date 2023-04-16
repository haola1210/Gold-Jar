import React from 'react';
import { useModalContext } from '@components/Modal';
import AvatarIcon from '@assets/AvatarIcon';
import { returnSessionOfDate } from './utils';
import { navLinks } from '@consts/links';
import NavBar from '@components/NavBar';
import Divider from '@components/Divider';
import Button from '@components/Button';
import { useAuthContext } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const modalContext = useModalContext();
  const navigate = useNavigate();

  const { logout } = useAuthContext();

  const closeModal = () => {
    modalContext?.toggle();
  };

  const handleOnClickLogout = () => {
    logout?.();
    localStorage.removeItem(`access_token`);
    navigate('/login');
  };

  const handleFeedback = () => {
    navigate('/feedback');
  };

  const auth = useAuthContext();

  return (
    <div className='h-screen max-w-2xl flex'>
      {/* left (content) */}
      <div className='px-4 py-5 bg-zinc-50 flex flex-col'>
        <div className='mb-16'>
          <div className='flex gap-4 items-center pb-2'>
            <AvatarIcon
              style={{ width: 40, height: 40 }}
              className={'bg-zinc-50 p-1 rounded-full ring-4 ring-offset-2 ring-lime-400 '}
              onClick={() => navigate('/user-detail')}
            />
            <span className='font-bold text-lg text-gray-700'>{auth.user?.name}</span>
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
        <div style={{ marginBottom: 'auto' }}>
          <Divider />
          <Button
            onClick={() => navigate('/report')}
            className='bg-gray-200 w-full'
          >
            Thống kê
          </Button>
        </div>

        <Divider />
        <div className='flex flex-col gap-2'>
          <Button
            className='bg-gray-200'
            onClick={handleFeedback}
          >
            Feedback hoặc Đề xuất tính năng
          </Button>
          <Button
            className='bg-gray-200'
            onClick={handleOnClickLogout}
          >
            Đăng xuất
          </Button>
        </div>
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
