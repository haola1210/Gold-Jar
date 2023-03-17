import React, { useCallback, useState } from 'react';
import type dayjs from 'dayjs';

import Calendar from '@components/Calendar';
import CuncerencyInput from '@components/CuncerencyInput';

import TagSelector from '@components/TagSelector';
import NavBar from '@components/NavBar';

import { Currency, type IncomeTag, type SpendingTag } from '@interfaces/tag.type';
import { useParams } from 'react-router-dom';
import { MoneyTypeBadge } from '@components/Badges';
import { type ActionType } from '@interfaces/action.type';
import { navLinks as links } from '@consts/links';
import Layout from '@components/Layout';
import { toast } from 'react-toastify';
import { type MoneyNote } from '@interfaces/money.type';
import { createNote } from '@services/money.service';

function Main() {
  const [selectDate, setSelectDate] = useState<dayjs.Dayjs | undefined>();
  const [value, setValue] = useState('');
  const [description, setDescription] = useState(``);

  const handleSelectDate = useCallback((date: dayjs.Dayjs | undefined) => {
    setSelectDate(date);
  }, []);

  const [tag, changeTag] = useState<IncomeTag | SpendingTag | undefined>(undefined);

  const { type } = useParams();

  const handleCreateNote = async () => {
    if (!tag) {
      toast(`Vui lòng chọn loại chi tiêu!`);
    }

    if (!value) {
      toast(`Vui lòng nhập số tiền nè!`);
    }

    if (tag && value && selectDate) {
      const payload: MoneyNote = {
        type: tag.id,
        amount: Number(value),
        description,
        unit: Currency.VND,
        forDate: {
          day: selectDate.date(),
          month: selectDate.month(),
          year: selectDate.year(),
        },
      };
      try {
        console.log(payload);
        const data = await createNote(payload);
        if (data) {
          toast('Tạo ghi chú thành công!');
          setValue('');
          setDescription('');
        }
      } catch (error) {
        toast('Có gì đó đang sai !');
      }
    }
  };

  const handleChangeAmount = (value: string) => {
    setValue(value);
  };

  return (
    <Layout>
      <div className='h-full w-full overflow-y-auto'>
        <Calendar onChange={handleSelectDate} />

        <div className='flex justify-center mt-2'>
          <NavBar
            links={links}
            isRound2Sides={true}
          />
        </div>
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
            onSelectTag={(tag: SpendingTag | IncomeTag | undefined) => changeTag(tag)}
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
}

export default Main;
