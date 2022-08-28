import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from '@components/Calendar';
import CuncerencyInput from '@components/CuncerencyInput';
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
    </div>
  );
}

export default App;
