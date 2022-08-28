import React, { useState } from 'react';
import * as dayjs from 'dayjs';
import { 
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon 
} from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';


import { range } from '@utils/range';
import { shalowCompareArray } from '@utils/shalowCompareArray';

const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const legend = {
  today: {
    color: 'pink-100',
    title: 'Ngày hôm nay'
  },
  selected: {
    color: 'green-100',
    title: 'Ngày đang chọn'
  }
};
const today = dayjs();

export interface ICalendar {
  value?: dayjs.Dayjs,
  onChange?: (_value: dayjs.Dayjs | null) => void
}

function Calendar({ value, onChange } : ICalendar) {
  
  const [day, setDay] = useState(() => dayjs());
  const [selectedDate, selectDate] = useState<dayjs.Dayjs | null>(
    value || (() => day)
  );
  
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

  const handleSelectDate = (date: number, month: number) => {
    let dateObject: dayjs.Dayjs;
    // Dec of last year
    if(month === 0) {
      dateObject = dayjs(`${thisYear-1}-${12}-${date}`);
    } 
    // Jan of next year
    else if (month === 13) {
      dateObject = dayjs(`${thisYear+1}-${1}-${date}`);
    }
    // this year
    else {
      dateObject = dayjs(`${thisYear}-${month}-${date}`);
    }
    
    // selected before -> unselect
    if(selectedDate && dateObject.isSame(selectedDate)) {
      selectDate(null);
      onChange?.(null);
    } else {
      selectDate(dateObject);
      onChange?.(dateObject);
    }
  };


  return (
    <div className='w-full h-min px-0.5 pt-1 pb-3 shadow-md rounded-xl'>
      {/* calendar header */}
      <div className="w-full flex h-8 justify-center items-center mb-1">
        <button 
          className='border-blue-400 border-2 rounded-full'
          onClick={() => handleChangeMonth('BACK')}
        >
          <ChevronDoubleLeftIcon className='w-4 h-4 m-1.5 text-blue-500' />
        </button>
        <p 
          className="flex-grow text-center text-sm \
            font-semibold mx-4 py-1 bg-orange-200 rounded-md"
        >
          { 
            selectedDate ? 
              selectedDate.format('DD MMM YYYY') : day.format('MMM YYYY') 
          }
        </p>
        <button 
          className='border-blue-400 border-2 rounded-full'
          onClick={() => handleChangeMonth('NEXT')}
        >
          <ChevronDoubleRightIcon className='w-4 h-4 m-1.5 text-blue-500' />
        </button>
      </div>

      <div className="w-full font-medium">
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
            range(lastMonthDays).map(i => {
              const thisDay = firstDate.subtract(firstDay - i, 'day');
              return (
                <div 
                  key={uuidv4()} 
                  className={
                    `
                      w-full text-center bg-slate-100 h-12 p-1 flex flex-col
                      ${
                        shalowCompareArray(
                          [selectedDate?.date(), selectedDate?.month(), selectedDate?.year()],
                          [thisDay.date(), thisDay.month(), thisDay.year()]
                        ) ? 'bg-green-100' : ''
                      }
                    `
                  }
                  onClick={() => handleSelectDate(thisDay.date(), thisMonth)}
                >
                  <div className=' h-4 leading-3 text-xs text-left '>
                    { thisDay.date() }
                  </div>
                  <div className='flex-grow' >

                  </div>
                </div>
              );
            })
          }

          {/* days of this month */}
          {
            range(daysInMonth).map(i => 
              <div 
                key={uuidv4()} 
                className={
                  `
                    w-full text-center h-12 p-1 flex flex-col
                    ${
                      shalowCompareArray(
                        [today.date(), today.month(), today.year()],
                        [i+1, thisMonth, thisYear]
                      ) ? 'bg-pink-100' : ''
                    }
                    ${
                      shalowCompareArray(
                        [selectedDate?.date(), selectedDate?.month(), selectedDate?.year()],
                        [i+1, thisMonth, thisYear]
                      ) ? '!bg-green-100' : ''
                    }
                  `
                }
                onClick={() => handleSelectDate(i+1, thisMonth+1)}
              >
                <div className=' h-4 leading-3 text-xs text-left'>{i+1}</div>
                <div className='flex-grow' >
                  
                </div>
              </div>
            )
          }

          {/* days of next month */}
          {
            range(nextMonthDays).map(i => {
              const thisDay = lastDate.add(i + 1, 'day');
              return (
                <div 
                  key={uuidv4()} 
                  className={
                    `
                      w-full text-center bg-slate-100 h-12 p-1 flex flex-col
                      ${
                        shalowCompareArray(
                          [selectedDate?.date(), selectedDate?.month(), selectedDate?.year()],
                          [thisDay.date(), thisDay.month(), thisDay.year()]
                        ) ? 'bg-green-100' : ''
                      }
                    `
                  }
                  onClick={() => handleSelectDate(thisDay.date(), thisMonth+2)}
                >
                  <div className=' h-4 leading-3 text-xs text-left'>
                    { thisDay.date() }
                  </div>
                  <div className='flex-grow' >
                    
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="mt-2 px-2 w-full flex justify-between text-sm text-gray-500 font-medium">
        {Object.keys(legend).map(key => (
          <div key={key} className='flex items-center'>
            <span className={
              `
                block w-4 h-4
                bg-${legend[key as keyof typeof legend].color}
                rounded-full
                outline outline-${legend[key as keyof typeof legend].color.replace('1', '3')}
              `
            } />
            <p className='px-2'>{legend[key as keyof typeof legend].title.replace('1', '3')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;