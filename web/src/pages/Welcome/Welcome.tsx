import Button from '@components/Button';
// Import LoginLayout from '@components/LoginLayout';
import { useNavigate } from 'react-router-dom';
import LogoFull from '@assets/LogoFull';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    // <LoginLayout>
    <div className='w-full h-full flex flex-col items-center'>
      {/* logo */}
      <LogoFull />

      {/*  */}
      <div className='p-4'>
        <div className='font-semibold text-sky-400 text-xl'>
          Mừng bạn đến với
          <span
            className='text-orange-400'
            style={{
              margin: '0 10px',
            }}
          >
            DINOTE
          </span>
          <code className='text-sm p-1 rounded-full bg-gray-200 text-gray-800'>/daɪnəʊt/</code>
        </div>
        <div className='mt-4 mb-8 font-semibold text-sky-400 text-xl'>
          Ứng dụng quản lí chi tiêu tiện lợi và hiện đại
        </div>
        <div className='text-md text-gray-600 font-semibold'>
          <div className='pb-2'>
            Quản lí chi tiêu một cách đơn giản với giao diện trực quan và hiện đại
          </div>
          <div className='pb-2'>
            Thống kê rõ ràng, linh hoạt với các biểu đồ sinh động, hỗ trợ xuất file excel
          </div>
          <div>Cổng tiếp nhận góp ý của người dùng để cải thiện app từng ngày</div>
        </div>
        <div className='mt-8 flex justify-end'>
          <Button
            style={{
              width: '100px',
            }}
            className='mr-8 text-gray-800 bg-cyan-200 text-base'
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </Button>
          <Button
            style={{
              width: '100px',
            }}
            onClick={() => navigate('/register')}
            className='text-gray-800 bg-cyan-200 text-base'
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
    // </LoginLayout>
  );
};

export default Welcome;
