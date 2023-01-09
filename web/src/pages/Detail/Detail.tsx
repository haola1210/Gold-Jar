import Collapse from '@components/Collapse';
import Panel from '@components/Collapse/Panel';
import { useParams } from 'react-router-dom';
import { mockdata } from './data.mock';

const Detail = () => {
  const { date } = useParams();
  return (
    <>
      <div className='my-2 mx-2 border-solid border-2 flex justify-center'>{date}</div>
      {/* ở đây là component collapse */}
      <div>
        <Collapse accordion>
          {mockdata.map((item) => (
            <Panel
              panelKey={item.key}
              header={item.header}
              key={item.header}
              emptyChildren={'Không có ghi chú nè!!!'}
            >
              {item.description}
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
};

export default Detail;
