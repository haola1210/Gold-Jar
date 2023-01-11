import Collapse, { Panel } from '@components/Collapse';
import { useNavigate, useParams } from 'react-router-dom';
import { mockdata } from './data.mock';
import { type ActionType } from '@interfaces/action.type';
import Layout from '@components/Layout';

const Detail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/income');
  };

  return (
    <Layout>
      <div className='p-2 h-full flex flex-col'>
        <div className='flex items-center justify-center mt-4 mb-8 font-bold text-gray-800'>
          <span className='px-4 py-2 bg-zinc-200 rounded-l-xl !pr-1'>
            Chi tiết thu nhập của ngày:
          </span>
          <span className='px-4 py-2 rounded-r-xl bg-orange-400 !pl-1'>{date}</span>
        </div>
        {/* ở đây là component collapse */}
        <div className='grow border-2 border-gray-400 rounded-lg bg-slate-200 p-1 overflow-y-auto'>
          <Collapse>
            {mockdata.map((item) => (
              <Panel
                panelKey={item.key}
                header={item.header}
                key={item.header}
                type={item.type as ActionType}
              >
                {item.description}
              </Panel>
            ))}
          </Collapse>
        </div>
        <div className=''>
          <button onClick={handleGoHome}>Go home</button>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
