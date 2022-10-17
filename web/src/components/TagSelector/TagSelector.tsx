import React, { useEffect, useMemo } from 'react';
import { incomeList, spendingList } from '@consts';
import Tag from './Tag';
import { ActionType, SpendingTag, IncomeTag } from '@types';
import { useLocation } from 'react-router-dom';

type TagType = SpendingTag | IncomeTag;

export interface ITagSelector {
  type: ActionType
  onSelectTag: (_tag: TagType | null) => void
  selectedTag: TagType | null
}

const mapper = {
  [ActionType.INCOME.toLowerCase()]: () => incomeList,
  [ActionType.SPENDING.toLowerCase()]: () => spendingList,
};

function TagSelector({ type, onSelectTag, selectedTag }: ITagSelector) {

  const tagList = useMemo(() => {
    return mapper[type]();
  }, [type]);

  const location = useLocation();
  useEffect(() => {
    onSelectTag(null);
  }, [location]);

  return (
    <div className='p-1'>
      <div className='text-xs font-medium text-gray-500 p-1' style={{ minHeight: '48px' }}>
        {
          selectedTag ?
            <>
              <span className='text-red-500 text-base text-white! '>*</span>
              {` ${selectedTag.description}`}
            </> :
            <>
              Hãy chọn một trong những <span 
                className='bg-gray-300 rounded-full py-0.5 px-2'
              >Tags</span> dưới đây 
            </>
        }
      </div>
      <div className='grid grid-cols-3 grid-rows-2 gap-2 p-1'>
        {
          tagList.map(e => (
            <Tag 
              key={e.id} 
              tag={e}
              onClick={onSelectTag} 
              className={e.color}
              active={e.id === selectedTag?.id}
            />
          ))
        }
      </div>
    </div>
  );
}

export default TagSelector;