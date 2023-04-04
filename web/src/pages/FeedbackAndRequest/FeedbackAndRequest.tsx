import Button from '@components/Button';
import H1 from '@components/H1';
import Layout from '@components/Layout';
import { useNavigate } from 'react-router-dom';

const FeedbackAndRequest = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ padding: '24px 5px' }}>
        <H1 className='font-medium ml-2 mb-10 text-sky-400'>Yêu cầu và phản hồi</H1>
        <div className='mx-2 border-dashed rounded-lg border-2 p-5 text-lg'>
          <p>
            Đội ngũ phát triển rất vui lòng tiếp nhận các phản hồi khi sử dụng ứng dụng, để chúng
            tôi có thể cải thiện ứng dụng tốt hơn.
          </p>
          <br />
          <p>
            Chúng tôi biết rằng ứng dụng vẫn còn rất đơn giản, vì vậy nếu bạn có ý tưởng về một tính
            năng nào đó. Đừng do dự hay liên lạc với chúng tôi, chúng tôi sẽ tung ra tính năng đó
            sớm nhất có thể
          </p>
          <br />
          <p>Chúng tôi sẽ ghi nhận bạn là một VIP. Các đãi ngộ của VIP:</p>
          <ol className='list-decimal pl-6'>
            <li>Sẽ không xuất hiện quảng cáo</li>
            <li>Sẽ được sử dụng full tính năng</li>
            <li>Sẽ được trải nghiệm những tính năng mới (BETA)</li>
          </ol>
          <br />
          <p>
            Liên hệ ngay: <span className='text-green-400 '>daxua@gmail.com</span>
          </p>
        </div>
        <div className='text-right mt-4 mr-2'>
          <Button
            className='bg-green-500 text-green-100'
            onClick={() => navigate('/spending')}
          >
            Trở về
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackAndRequest;
