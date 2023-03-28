import { MoneyTypeBadge } from '@components/Badges';
import CuncerencyInput from '@components/CuncerencyInput';
import Layout from '@components/Layout';
import { Tab, Tabs } from '@components/Tabs';
import TagSelector from '@components/TagSelector';
import { incomeList } from '@consts/income-list';
import { spendingList } from '@consts/spending-list';
import { ActionType } from '@interfaces/action.type';
import { type MoneyNote } from '@interfaces/money.type';
import {
  Currency,
  IncomeTagId,
  SpendingTagId,
  type IncomeTag,
  type SpendingTag,
} from '@interfaces/tag.type';
import { getDetailById, updateNote } from '@services/note.service';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditNote = () => {
  const [note, setNote] = useState<MoneyNote>({
    type: ActionType.SPENDING,
    subType: SpendingTagId.EXPENSE,
    amount: 0,
    unit: Currency.VND,
    forDate: {
      month: 0,
      day: 0,
      year: 0,
    },
  });
  const [value, setValue] = useState('');
  const [description, setDescription] = useState(``);
  const [type, setType] = useState<ActionType>(ActionType.SPENDING);

  const [tag, changeTag] = useState<IncomeTag | SpendingTag | undefined>(undefined);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    if (!tag) {
      toast(`Vui lòng chọn loại chi tiêu!`);
    }

    if (!value) {
      toast(`Vui lòng nhập số tiền nè!`);
    }

    if (tag && value) {
      let type = ActionType.SPENDING;
      if (tag.id in SpendingTagId) {
        type = ActionType.SPENDING;
      } else if (tag.id in IncomeTagId) {
        type = ActionType.INCOME;
      }

      const payload: MoneyNote = {
        type,
        subType: tag.id,
        amount: Number(value),
        description,
        unit: Currency.VND,
        forDate: note.forDate,
      };

      try {
        const data = await updateNote(id ?? ``, payload);
        if (data) {
          toast('Cập nhật ghi chú thành công!');
          navigate(
            `/detail?day=${note.forDate.day}&month=${note.forDate.month}&year=${note.forDate.year}`,
          );
        }
      } catch (error) {
        toast('Có gì đó đang sai !');
      }
    }
  };

  const handleChangeAmount = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    (async () => {
      const data = await getDetailById(id ?? ``);
      setValue(`${data.amount}`);
      setType(data.type);
      setDescription(data.description ?? ``);
      let tag;
      if (data.type === ActionType.SPENDING) {
        const index = spendingList.findIndex((item) => item.id === data.subType);
        tag = spendingList[index];
      } else if (data.type === ActionType.INCOME) {
        const index = incomeList.findIndex((item) => item.id === data.subType);
        tag = incomeList[index];
      }

      changeTag(tag);

      setNote(data);
    })();
  }, []);

  return (
    <Layout>
      <div className='h-full w-full overflow-y-auto'>
        <div className='inline-block mt-2 mb-1 font-medium text-3xl puml-2'>Chỉnh sửa ghi chú</div>
        <div className='px-2'>
          <div className='flex align-center justify-center gap-1'></div>
          <span className='inline-block mt-2 mb-1 font-medium'>
            Số tiền{' '}
            {tag && (
              <MoneyTypeBadge
                tag={tag}
                type={type}
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
        <div>
          <Tabs
            selectedTab={type}
            onSelect={setType}
          >
            <Tab id={ActionType.SPENDING}>Chi</Tab>
            <Tab id={ActionType.INCOME}>Tiêu</Tab>
          </Tabs>
        </div>
        {type && (
          <TagSelector
            type={type}
            selectedTag={tag}
            onSelectTag={(tag: SpendingTag | IncomeTag | undefined) => {
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
        <div className='p-2 flex justify-end gap-2'>
          <button
            className='inline-block py-2 px-4 bg-green-600 font-bold text-white rounded-lg'
            onClick={handleCreateNote}
          >
            Lưu
          </button>
          <button
            className='inline-block py-2 px-4 bg-rose-500 font-bold text-white rounded-lg'
            onClick={() =>
              navigate(
                `/detail?day=${note.forDate.day}&month=${note.forDate.month}&year=${note.forDate.year}`,
              )
            }
          >
            Trở lại
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditNote;
