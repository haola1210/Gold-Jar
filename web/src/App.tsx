import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from '@components/Calendar';
import CuncerencyInput from '@components/CuncerencyInput';
import Tag from '@components/Tag';
import { spendingList } from './consts/spending-list';
function App() {

  const [, selectDate] = useState<dayjs.Dayjs | null>();
  const [value, setValue] = useState('');

  // const [spendingList] = useState(spendingList);
  const [selectedTag, selectTag] = useState(0);

  const handleSelectDate = useCallback((date: dayjs.Dayjs | null) => {
    selectDate(date);
  }, []);

  return (
    <div className="h-full w-full">
      <Calendar onChange={handleSelectDate} />

      Child: <CuncerencyInput value={value} onChange={setValue} className='' />
      {
        spendingList.map(e => (
          <Tag 
            key={e.id} 
            id={e.id} 
            title={e.title}
            onClick={selectTag} 
            className={e.color}
            active={e.id === selectedTag}
            activeColor={e.activeColor}
            outlineColor={e.outlineColor}
          />
        ))
      }
    </div>
  );
}

export default App;
