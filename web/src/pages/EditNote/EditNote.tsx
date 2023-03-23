import { MoneyTypeBadge } from '@components/Badges';
import CuncerencyInput from '@components/CuncerencyInput';
import Layout from '@components/Layout';
import TagSelector from '@components/TagSelector';
import { type ActionType } from '@interfaces/action.type';
import { type IncomeTag, type SpendingTag } from '@interfaces/tag.type';
import { getDetailById } from '@services/note.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditNote = () => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState(``);

  const [tag, changeTag] = useState<IncomeTag | SpendingTag | undefined>(undefined);

  const { id } = useParams();
  const type = 'spending';

  const handleCreateNote = async () => {};

  const handleChangeAmount = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    (async () => {
      const data = await getDetailById(id ?? ``);
      // console.log(Tag<data?.data?.type>);
      // changeTag(Tagdata?.data?.type);
    })();
  }, []);

  return (
    <Layout>
      <div className='h-full w-full overflow-y-auto'>
        <div className='inline-block mt-2 mb-1 font-medium text-3xl'>Chỉnh sửa ghi chú</div>
        <div className='px-2'>
          <span className='inline-block mt-2 mb-1 font-medium'>
            Số tiền{' '}
            {tag && (
              <MoneyTypeBadge
                tag={tag}
                type={type as ActionType}
              />
            )}
            :
          </span>
          <CuncerencyInput
            value={value}
            onChange={handleChangeAmount}
            className=''
          />
        </div>
        {type && (
          <TagSelector
            type={type as ActionType}
            selectedTag={tag}
            onSelectTag={(tag: SpendingTag | IncomeTag | undefined) => {
              console.log(tag);
              changeTag(tag);
            }}
          />
        )}
        <div className='px-2 pb-1'>
          <textarea
            style={{ resize: 'none' }}
            className='w-full border p-2 rounded-md'
            rows={4}
            placeholder='Chi tiết cụ thể về số tiền này'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className='p-2 flex justify-end'>
          <button
            className='inline-block py-2 px-4 bg-green-600 font-bold text-white rounded-lg'
            onClick={handleCreateNote}
          >
            Lưu
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditNote;
