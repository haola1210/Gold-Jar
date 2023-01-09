import React, { useCallback, useState } from 'react';
import type dayjs from 'dayjs';

import Calendar from '@components/Calendar';
import CuncerencyInput from '@components/CuncerencyInput';

import TagSelector from '@components/TagSelector';
import NavBar from '@components/NavBar';

import { type IncomeTag, type SpendingTag } from '@interfaces/tag.type';
import { useParams } from 'react-router-dom';
import { MoneyTypeBadge } from '@components/Badges';
import { type ActionType } from '@interfaces/action.type';
import { navLinks as links } from '@consts/links';

function Main() {
  const [, selectDate] = useState<dayjs.Dayjs | undefined>();
  const [value, setValue] = useState('');

  const handleSelectDate = useCallback((date: dayjs.Dayjs | undefined) => {
    selectDate(date);
  }, []);

  const [tag, changeTag] = useState<IncomeTag | SpendingTag | undefined>(undefined);

  const { type } = useParams();

  return (
    <div className='h-full w-full overflow-y-scroll'>
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
          onChange={setValue}
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
        />
      </div>
      <div className='p-2 flex justify-end'>
        <button className='inline-block py-2 px-4 bg-green-600 font-bold text-white rounded-lg'>
          Lưu
        </button>
      </div>
    </div>
  );
}

export default Main;
