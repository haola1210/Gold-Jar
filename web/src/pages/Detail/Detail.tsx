import Collapse, { Panel } from '@components/Collapse';
import Layout from '@components/Layout';
import { type MoneyNote } from '@interfaces/money.type';
import { getDetail, deleteNote } from '@services/note.service';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RecordBody from './components/RecordBody';
import RecordHeader from './components/RecordHeader';

const Detail = () => {
  const [params] = useSearchParams();
  const [data, setData] = useState<MoneyNote[]>([]);
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate(localStorage.getItem(`oldPath`) ?? ``);
  };

  useEffect(() => {
    (async () => {
      const data = await getDetail(
        params.get(`day`) ?? ``,
        params.get(`month`) ?? ``,
        params.get(`year`) ?? ``,
      );
      setData(data?.data);
    })();
  }, []);

  const handleDeleteNote = async (id?: string) => {
    await deleteNote(id)
      .then(async () => {
        const data = await getDetail(
          params.get(`day`) ?? ``,
          params.get(`month`) ?? ``,
          params.get(`year`) ?? ``,
        );
        setData(data?.data);
        toast(`Xoá thành công ghi chú!!!`);
      })
      .catch(() => {
        toast(`Có gì đó đang sai nè!`);
      });
  };

  return (
    <Layout>
      <div className='p-2 h-full flex flex-col'>
        <div className='flex items-center justify-center mt-4 mb-8 font-bold text-gray-800'>
          <span className='px-4 py-2 bg-zinc-200 rounded-l-xl !pr-1'>
            Chi tiết thu nhập của ngày:
          </span>
          <span className='px-4 py-2 rounded-r-xl bg-orange-400 !pl-1'>{`${
            params.get(`day`) ?? ``
          }-${params.get(`month`) ?? ``}-${params.get(`year`) ?? ``}`}</span>
        </div>
        {/* ở đây là component collapse */}
        <div className='grow border-2 border-gray-400 rounded-lg bg-slate-200 p-1 overflow-y-auto'>
          <Collapse>
            {data.map((item) => (
              <Panel
                panelKey={item?._id}
                header={
                  <RecordHeader
                    type={item.type}
                    tagId={item.subType}
                    concurrency={item.amount}
                  />
                }
                key={item._id}
                type={item.type}
              >
                <RecordBody
                  detail={item.description ?? ``}
                  onClickEdit={() => navigate(`/edit-note/${item?._id ?? ``}`)}
                  onClickDelete={async () => handleDeleteNote(item?._id)}
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
