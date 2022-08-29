import React, { useState } from 'react';
import { spendingList } from '@/consts';
import Tag from '@components/Tag';

type TagList = typeof spendingList;
type Tag = TagList[number];

export interface ISpendingTags {
  tagList: TagList
  onSelectTag?: (_tagId: Tag['id']) => void;
}

function SpendingTags({ tagList }: ISpendingTags) {

  const [selectedId, select] = useState(0);
  const selectedTag = tagList.find(e => e.id === selectedId);

  return (
    <div className='p-1'>
      <div className='text-xs font-medium text-gray-500 p-1'>
        {
          selectedTag && 
          <>
            <span className='text-red-500 text-base '>*</span>
            {` ${selectedTag.description}`}
          </>
        }
      </div>
      <div className='grid grid-cols-3 grid-rows-2 gap-2 p-1'>
        {
          tagList.map(e => (
            <Tag 
              key={e.id} 
              id={e.id} 
              title={e.title}
              onClick={select} 
              className={e.color}
              active={e.id === selectedId}
              activeColor={e.activeColor}
              outlineColor={e.outlineColor}
            />
          ))
        }
      </div>
    </div>
  );
}

export default SpendingTags;