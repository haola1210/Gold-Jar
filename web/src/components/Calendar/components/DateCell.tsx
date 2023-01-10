import React from 'react';
import { type IDateCell } from '../types';

const DateCell = ({ className, date, onClick }: IDateCell) => {
  return (
    <div
      className={`w-full text-center h-12 p-1 flex flex-col ${className}`}
      onClick={onClick}
    >
      <div className=' h-4 leading-3 text-xs text-left'>{date}</div>
      <div className='flex-grow'></div>
    </div>
  );
};

export default DateCell;
