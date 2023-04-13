import Button from '@components/Button';
import H1 from '@components/H1';
import Layout from '@components/Layout';
import { useAuthContext } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  return (
    <Layout>
      <div style={{ padding: '24px 5px' }}>
        <H1 className='font-medium ml-2 mb-10 text-sky-400'>Tài khoản</H1>
        <div className='mx-2 border-dashed rounded-lg border-2 p-5 text-lg'>
          <div className='mb-4'>
            <div className='font-bold'>Tên:</div>
            <div>{user?.name}</div>
          </div>
          <div className='mb-4'>
            <div className='font-bold'>Email:</div>
            <div>{user?.email}</div>
          </div>
          <div className='flex justify-end mt-4 gap-2'>
            <Button
              className='block py-2 px-4 bg-green-600 font-bold text-white rounded-lg'
              onClick={() => navigate('/change-user-info')}
            >
              Đổi thông tin
            </Button>
            <Button
              className='block py-2 px-4 bg-green-600 font-bold text-white rounded-lg'
              onClick={() => navigate('/change-user-password')}
            >
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetail;
