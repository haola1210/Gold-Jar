import Button from '@components/Button';
import H1 from '@components/H1';
import LoginLayout from '@components/LoginLayout';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <div className='p-4'>
        <div className='text-center font-bold text-sm text-cyan-700 text-lg'>
          Chào mừng bạn đến với
        </div>
        <div className='text-center'>
          <H1 className='text-yellow-500'>Hũ vàng 4.0</H1>
        </div>
        <div className='my-4 text-center font-bold text-sm text-cyan-700 text-lg'>
          Ứng dụng quản lí chi tiêu tiện lợi và hiện đại
        </div>
        <div className='text-center mt-8'>
          <Button
            className='mr-8 text-cyan-700 bg-cyan-300 text-base'
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </Button>
          <Button
            onClick={() => navigate('/register')}
            className='text-cyan-700 bg-cyan-300 text-base'
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Welcome;
