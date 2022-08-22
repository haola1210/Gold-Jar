import React, { useState } from 'react';
import * as dayjs from 'dayjs';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';


import { range } from '@utils/range';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


function Calendar() {
  
  const [day, setDay] = useState(() => dayjs());
  
  
  // 
  const thisYear = day.year();
  const thisMonth = day.month(); // (January as 0, December as 11)
  const daysInMonth = day.daysInMonth();

  // first date and its day
  const firstDate = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  const firstDay = firstDate.day(); // (Sunday as 0, Saturday as 6)

  // last date and its day
  const lastDate = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  const lastDay = lastDate.day(); // (Sunday as 0, Saturday as 6)

  // number of the last month day
  const lastMonthDays = firstDay;
  // number of the next month day
  const nextMonthDays = 6 - lastDay;

  return (
    <div className='w-full h-min px-0.5 pt-1'>
      {/* calendar header */}
      <div className="w-full flex h-8 justify-center items-center mb-1">
        <button className='border-blue-400 border-2 rounded-full'>
          <ChevronDoubleLeftIcon className='w-4 h-4 m-1.5 text-blue-500' />
        </button>
        <p className="flex-grow text-center text-sm font-semibold mx-4 py-1 bg-orange-200 rounded-md">
          { day.format('DD MMM YYYY') }
        </p>
        <button className='border-blue-400 border-2 rounded-full'>
          <ChevronDoubleRightIcon className='w-4 h-4 m-1.5 text-blue-500' />
        </button>
      </div>

      <div className="w-full">
        {/* calendar week days */}
        <div className='w-full flex border-b-2 '>
          {
            weekDays.map(wD => (
              <div key={wD} className=' flex-grow text-center'>{ wD }</div>
            ))
          }
        </div>

        {/* calendar days */}
        <div className="w-full flex flex-wrap">
          {/* days of last month */}
          {
            range(lastMonthDays).map(i =>
              <div key={uuidv4()} style={{ width: 'calc(100% / 7)' }} className=" flex-grow text-center">
                {firstDate.subtract(firstDay - i, 'day').date()}
              </div>
            )
          }

          {/* days of this month */}
          {
            range(daysInMonth).map(i => 
              <div key={uuidv4()} style={{ width: 'calc(100% / 7)' }} className=" flex-grow text-center">
                {i+1}
              </div>
            )
          }

          {/* days of next month */}
          {
            range(nextMonthDays).map(i => 
              <div key={uuidv4()} style={{ width: 'calc(100% / 7)' }} className=" flex-grow text-center">
                {lastDate.add(i + 1, 'day').date()}
              </div>
            )
          }
        </div>
      </div>
      
    </div>
  );
}

export default Calendar;