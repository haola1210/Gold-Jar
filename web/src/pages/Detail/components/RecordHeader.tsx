import React from 'react';
import { type IRecordHeader } from './types';
import { MoneyTypeBadge } from '@components/Badges';
import { ActionType } from '@interfaces/action.type';
import { incomeMapper } from '@consts/income-list';
import { spendingMapper } from '@consts/spending-list';

const RecordHeader = ({ type, tagId, concurrency }: IRecordHeader) => {
  const tagMapper = type === ActionType.INCOME ? incomeMapper : spendingMapper;

  // @ts-ignore
  const currentTag = tagMapper[tagId];

  return (
    <div className='w-full flex flex-row justify-center '>
      <div
        className='h-fit'
        style={{ lineHeight: '18px', marginRight: '2px' }}
      >
        <MoneyTypeBadge
          type={type}
          tag={currentTag}
        />
      </div>
      : &nbsp;{concurrency}
    </div>
  );
};

export default RecordHeader;
