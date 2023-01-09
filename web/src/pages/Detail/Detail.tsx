import Collapse from '@components/Collapse';
import Panel from '@components/Collapse/Panel';
import { useNavigate, useParams } from 'react-router-dom';
import { mockdata } from './data.mock';

const Detail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/income');
  };

  return (
    <>
      <div className='flex items-center justify-center my-4 text-lg'>
        <b>Chi tiết thu nhập của ngày:</b>&nbsp;
        <span className='border-solid px-2 py-1 rounded-xl bg-orange-400'>{date}</span>
      </div>
      {/* ở đây là component collapse */}
      <div>
        <Collapse>
          {mockdata.map((item) => (
            <Panel
              panelKey={item.key}
              header={item.header}
              key={item.header}
              emptyChildren={''}
            >
              {item.description}
            </Panel>
          ))}
        </Collapse>
        <div className=''>
          <button onClick={handleGoHome}>Go home</button>
        </div>
      </div>
    </>
  );
};

export default Detail;
