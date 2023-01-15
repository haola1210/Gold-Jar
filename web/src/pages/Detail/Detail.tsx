import Collapse, { Panel } from '@components/Collapse';
import { useNavigate, useParams } from 'react-router-dom';
import { mockDataResponse } from './data.mock';
import { type ActionType } from '@interfaces/action.type';
import Layout from '@components/Layout';
import RecordHeader from './components/RecordHeader';
import { type IncomeTagId, type SpendingTagId } from '@interfaces/tag.type';
import RecordBody from './components/RecordBody';

const Detail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate(-1);
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
            {mockDataResponse.map((item) => (
              <Panel
                panelKey={item.id}
                header={
                  <RecordHeader
                    type={item.type as ActionType}
                    tagId={item.subType as SpendingTagId | IncomeTagId}
                    concurrency={item.concurrency}
                  />
                }
                key={item.id}
                type={item.type as ActionType}
              >
                <RecordBody
                  detail={item.detail}
                  onClickEdit={() => console.log('click edit')}
                  onClickDelete={() => console.log('click delete')}
                />
              </Panel>
            ))}
          </Collapse>
        </div>
        <div className='pt-4'>
          <button
            className='block py-2 px-4 bg-green-600 font-bold text-white rounded-lg ml-auto'
            onClick={handleGoHome}
          >
            Trở lại
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
