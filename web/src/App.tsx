import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from '@components/Calendar';
import CuncerencyInput from '@components/CuncerencyInput';
import { spendingList } from './consts/spending-list';
import SpendingTags from '@components/SpendingTags';
function App() {

  const [, selectDate] = useState<dayjs.Dayjs | null>();
  const [value, setValue] = useState('');

  const handleSelectDate = useCallback((date: dayjs.Dayjs | null) => {
    selectDate(date);
  }, []);

  return (
    <div className="h-full w-full">
      <Calendar onChange={handleSelectDate} />

      Child: <CuncerencyInput value={value} onChange={setValue} className='' />
      <SpendingTags tagList={spendingList} />
    </div>
  );
}

export default App;
