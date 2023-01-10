import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as dayjs from 'dayjs';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline';

import { rangeWithKey } from '@utils/range';
import { shalowCompareArray } from '@utils/shalowCompareArray';
import CalendarHeader from './components/CalendarHeader';
import { useNavigate } from 'react-router-dom';
import { legend, weekDays } from './consts';
import { type ICalendar } from './types';
import DateCell from './components/DateCell';

const today = dayjs();

/**
 * We just need to get the selected date from this component
 *
 * We don't need to update the selected date of this component from outside
 *
 * Because by default when open app, the selected date is today.
 *
 * So we should memo this component.
 */
function Calendar({ onChange }: ICalendar) {
  const [day, setDay] = useState(() => dayjs());
  const [selectedDate, selectDate] = useState<dayjs.Dayjs | undefined>(() => day);
  const navigate = useNavigate();

  useEffect(() => {
    onChange?.(selectedDate);
  }, [selectedDate]);

  //
  const thisYear = useMemo(() => day.year(), [day.year()]);
  const thisMonth = useMemo(() => day.month(), [day.month()]); // (January as 0, December as 11)
  const daysInMonth = useMemo(() => day.daysInMonth(), [day.daysInMonth()]);

  // First date in calendar and its day
  const firstDate = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  const firstDay = firstDate.day(); // (Sunday as 0, Saturday as 6)

  // last date in calendar and its day
  const lastDate = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  const lastDay = lastDate.day(); // (Sunday as 0, Saturday as 6)

  // number of the last month day
  const lastMonthDays = firstDay;
  // Number of the next month day
  const nextMonthDays = 6 - lastDay;

  const handleChangeMonth = (type: 'NEXT' | 'BACK') => {
    if (type === 'NEXT') {
      setDay(day.add(1, 'month'));
      selectDate(undefined);
    } else if (type === 'BACK') {
      setDay(day.subtract(1, 'month'));
      selectDate(undefined);
    }
  };

  const handleSelectDate = (date: number, month: number) => {
    let dateObject: dayjs.Dayjs;
    // Dec of last year
    if (month === 0) {
      dateObject = dayjs(`${thisYear - 1}-${12}-${date}`);
    }
    // Jan of next year
    else if (month === 13) {
      dateObject = dayjs(`${thisYear + 1}-${1}-${date}`);
    }
    // This year
    else {
      dateObject = dayjs(`${thisYear}-${month}-${date}`);
    }

    // Selected before -> move to detail page
    // console.log(selectedDate, dateObject, dateObject.isSame(selectedDate, 'date'));
    if (selectedDate && dateObject.isSame(selectedDate, 'date')) {
      //
      navigateDetail('12-10-2000');
    } else {
      selectDate(dateObject);
    }
  };

  const navigateDetail = useCallback((date: string) => {
    navigate(`/detail/${date}`);
  }, []);

  // Optimized ranges
  const datesInLastMonth = useMemo(() => {
    return rangeWithKey(lastMonthDays);
  }, [lastMonthDays]);

  const datesInThisMonth = useMemo(() => {
    return rangeWithKey(daysInMonth);
  }, [daysInMonth]);

  const datesInNextMonth = useMemo(() => {
    return rangeWithKey(nextMonthDays);
  }, [nextMonthDays]);

  return (
    <div className='w-full h-min px-0.5 pt-1 pb-3 shadow-md rounded-xl'>
      {/* calendar header */}
      <div className='w-full flex h-8 justify-center items-center mb-1'>
        <button
          className='border-blue-400 border-2 rounded-full'
          onClick={() => handleChangeMonth('BACK')}
        >
          <ChevronDoubleLeftIcon className='w-4 h-4 m-1.5 text-blue-500' />
        </button>
        <p
          className='flex-grow text-center text-sm \
            font-semibold mx-4 py-1 bg-orange-200 rounded-md'
        >
          {selectedDate ? selectedDate.format('DD MMM YYYY') : day.format('MMM YYYY')}
        </p>
        <button
          className='border-blue-400 border-2 rounded-full'
          onClick={() => handleChangeMonth('NEXT')}
        >
          <ChevronDoubleRightIcon className='w-4 h-4 m-1.5 text-blue-500' />
        </button>
      </div>

      <div className='w-full font-medium'>
        {/* calendar week days */}
        <CalendarHeader weekDays={weekDays} />

        {/* calendar days */}
        <div
          className={` w-full
              grid grid-cols-7 grid-rows-5
              divide-x
              divide-y divide-y-reverse
              devide-blue-300
              border-r
            `}
        >
          {/* days of last month */}
          {datesInLastMonth.map(({ value, key }) => {
            const thisDay = firstDate.subtract(firstDay - value, 'day');
            return (
              <DateCell
                key={key}
                className={`${
                  shalowCompareArray(
                    [selectedDate?.date(), selectedDate?.month(), selectedDate?.year()],
                    [thisDay.date(), thisDay.month(), thisDay.year()],
                  )
                    ? 'bg-green-100'
                    : ''
                }`}
                onClick={() => handleSelectDate(thisDay.date(), thisMonth)}
                date={thisDay.date()}
              />
            );
          })}

          {/* days of this month */}
          {datesInThisMonth.map(({ value, key }) => (
            <DateCell
              key={key}
              className={`${
                shalowCompareArray(
                  [today.date(), today.month(), today.year()],
                  [value + 1, thisMonth, thisYear],
                )
                  ? 'bg-pink-100'
                  : ''
              } ${
                shalowCompareArray(
                  [selectedDate?.date(), selectedDate?.month(), selectedDate?.year()],
                  [value + 1, thisMonth, thisYear],
                )
                  ? '!bg-green-100'
                  : ''
              }`}
              onClick={() => handleSelectDate(value + 1, thisMonth + 1)}
              date={value + 1}
            />
          ))}

          {/* days of next month */}
          {datesInNextMonth.map(({ value, key }) => {
            const thisDay = lastDate.add(value + 1, 'day');
            return (
              <DateCell
                key={key}
                className={`${
                  shalowCompareArray(
                    [selectedDate?.date(), selectedDate?.month(), selectedDate?.year()],
                    [thisDay.date(), thisDay.month(), thisDay.year()],
                  )
                    ? 'bg-green-100'
                    : ''
                }`}
                onClick={() => handleSelectDate(thisDay.date(), thisMonth + 2)}
                date={thisDay.date()}
              />
            );
          })}
        </div>
      </div>
      <div className='mt-2 px-2 w-full flex justify-between text-sm text-gray-500 font-medium'>
        {Object.keys(legend).map((key) => (
          <div
            key={key}
            className='flex items-center'
          >
            <span
              className={`
                block w-4 h-4
                bg-${legend[key as keyof typeof legend].color}
                rounded-full
                outline outline-${legend[key as keyof typeof legend].color.replace('1', '3')}
              `}
            />
            <p className='pl-2'>{legend[key as keyof typeof legend].title.replace('1', '3')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Calendar);
