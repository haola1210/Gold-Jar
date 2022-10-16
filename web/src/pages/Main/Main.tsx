import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import Calendar from '@components/Calendar';
import CuncerencyInput from '@components/CuncerencyInput';

import TagSelector from '@components/TagSelector';
import NavBar from '@components/NavBar';

import { ActionType, IncomeTag, SpendingTag } from '@types';
import { useParams } from 'react-router-dom';

const links = [
  { title: 'Sổ Thu', to: '/income' },
  { title: 'Sổ Chi', to: '/spending' },
];

function Main() {

  const [, selectDate] = useState<dayjs.Dayjs | null>();
  const [value, setValue] = useState('');

  const handleSelectDate = useCallback((date: dayjs.Dayjs | null) => {
    selectDate(date);
  }, []);

  const [tag, changeTag] = useState<IncomeTag | SpendingTag | null>(null);

  const { type } = useParams();



  return (
    <div className="min-h-full w-full overflow-y-scroll">
      <Calendar onChange={handleSelectDate} />

      Child: <CuncerencyInput value={value} onChange={setValue} className='' />
      { type && 
        <TagSelector 
          type={type.toUpperCase() as ActionType}
          selectedTag={tag}
          onSelectTag={ (tag: SpendingTag | IncomeTag | null) => changeTag(tag) }
        />
      }

      <NavBar links={links} isRound2Sides={true} />
    </div>
  );
}

export default Main;
