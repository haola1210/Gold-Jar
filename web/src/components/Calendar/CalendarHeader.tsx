import React, { memo } from 'react';

interface ICalendarHeader {
  weekDays: string[];
}

function CalendarHeader({ weekDays }: ICalendarHeader) {
  return (
    <div className='w-full flex border-b-2 '>
      {weekDays.map((wD) => (
        <div
          key={wD}
          className=' flex-grow text-center'
        >
          {wD}
        </div>
      ))}
    </div>
  );
}

export default memo(CalendarHeader);
