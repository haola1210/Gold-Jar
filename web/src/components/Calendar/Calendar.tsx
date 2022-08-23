import React, { useState } from 'react';
import * as dayjs from 'dayjs';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';


import { range } from '@utils/range';

const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];


function Calendar() {
  
  const [day, setDay] = useState(() => dayjs());
  const today = dayjs();

  
  // 
  const thisYear = day.year();
  const thisMonth = day.month(); // (January as 0, December as 11)
  const daysInMonth = day.daysInMonth();

  // first date in calendar and its day
  const firstDate = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  const firstDay = firstDate.day(); // (Sunday as 0, Saturday as 6)

  // last date in calendar and its day
  const lastDate = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  const lastDay = lastDate.day(); // (Sunday as 0, Saturday as 6)

  // number of the last month day
  const lastMonthDays = firstDay;
  // number of the next month day
  const nextMonthDays = 6 - lastDay;

  const handleChangeMonth = (type: 'NEXT' | 'BACK') => {
    if(type === 'NEXT') {
      setDay(day.add(1, 'month'));
    } else if (type === 'BACK') {
      setDay(day.subtract(1, 'month'));
    }
  };

  return (
    <div className='w-full h-min px-0.5 pt-1'>
      {/* calendar header */}
      <div className="w-full flex h-8 justify-center items-center mb-1">
        <button 
          className='border-blue-400 border-2 rounded-full'
          onClick={() => handleChangeMonth('BACK')}
        >
          <ChevronDoubleLeftIcon className='w-4 h-4 m-1.5 text-blue-500' />
        </button>
        <p className="flex-grow text-center text-sm font-semibold mx-4 py-1 bg-orange-200 rounded-md">
          { day.format('DD MMM YYYY') }
        </p>
        <button 
          className='border-blue-400 border-2 rounded-full'
          onClick={() => handleChangeMonth('NEXT')}
        >
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
        <div 
          className={
            ` w-full 
              grid grid-cols-7 grid-rows-5 
              divide-x 
              divide-y divide-y-reverse 
              devide-blue-300
              border-r
            `
          }
        >
          
          {/* days of last month */}
          {
            range(lastMonthDays).map(i =>
              <div key={uuidv4()} className=" w-full text-center bg-slate-100 h-12 p-1 flex flex-col">
                <div className=' h-4 leading-3 text-xs text-left '>
                  {firstDate.subtract(firstDay - i, 'day').date()}
                </div>
                <div className='flex-grow' >

                </div>
              </div>
            )
          }

          {/* days of this month */}
          {
            range(daysInMonth).map(i => 
              <div key={uuidv4()} className={
                `
                  w-full text-center h-12 p-1 flex flex-col
                  ${today.date() === i+1 &&
                    today.month() === thisMonth &&
                    today.year() === thisYear ? 'bg-pink-100' : ''}
                `
              }>
                <div className=' h-4 leading-3 text-xs text-left'>{i+1}</div>
                <div className='flex-grow' >
                  
                </div>
              </div>
            )
          }

          {/* days of next month */}
          {
            range(nextMonthDays).map(i => 
              <div key={uuidv4()} className=" w-full text-center bg-slate-100 h-12 p-1 flex flex-col">
                <div className=' h-4 leading-3 text-xs text-left'>
                  {lastDate.add(i + 1, 'day').date()}
                </div>
                <div className='flex-grow' >
                  
                </div>
              </div>
            )
          }
        </div>
      </div>
      
    </div>
  );
}

export default Calendar;