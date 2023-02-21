import React from 'react';
import { type IRecordBody } from './types';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

const RecordBody = ({ detail, onClickDelete, onClickEdit }: IRecordBody) => {
  return (
    <div className='w-full flex flex-row '>
      <div className=' grow pr-2'>{detail}</div>
      <div className='flex flex-row gap-2'>
        <PencilAltIcon
          className='text-sky-600 h-5 w-5'
          onClick={onClickEdit}
        />
        <TrashIcon
          className='text-orange-600 h-5 w-5'
          onClick={onClickDelete}
        />
      </div>
    </div>
  );
};

export default RecordBody;
