import Button from '@components/Button';
import H1 from '@components/H1';
import Layout from '@components/Layout';
import { useNavigate } from 'react-router-dom';

const FeedbackAndRequest = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <H1 className='font-medium ml-2 mb-20'>Yêu cầu và phản hồi</H1>
        <div className='mx-2 border-dashed rounded-lg border-2 p-10'>
          nếu mày có phản hồi và đóng góp gì thì vui lòng gửi mail về địa chỉ:
          <span className='text-green-400 '>daxua@gmail.com</span>
        </div>
        <div className='text-right mt-4 mr-2'>
          <Button
            className='bg-green-500 text-green-100'
            onClick={() => navigate('/spending')}
          >
            Trang chủ
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackAndRequest;
