import React from 'react';
import { IncomeTag, SpendingTag } from '@types';

export interface ITag {
  tag: IncomeTag | SpendingTag
  active: boolean
  className?: string
  onClick: (_tag: ITag['tag']) => void
}

function Tag({ className, onClick, active, tag } : ITag) {
  const { title, activeColor, outlineColor } = tag;

  return (
    <span 
      className={`
        ${className} rounded-md p-2 font-medium text-sm 
        inline-block text-center text-gray-800 shadow-md
        ${
          active ? 
          `${activeColor} outline outline-offset-2 ${outlineColor} !text-white` : ''
        }
      `}
      onClick={() => onClick(tag)}
    >
      {title}
    </span>
  );
}

export default Tag;