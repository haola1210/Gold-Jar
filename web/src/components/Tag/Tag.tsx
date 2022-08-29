import React, { memo } from 'react';

export interface ITag {
  title: string
  active?: boolean
  className?: string
  id?: number
  onClick?: (_id: number) => void
  activeColor?: string
  outlineColor?: string
}

function Tag({ title, className, id, onClick, active, activeColor, outlineColor } : ITag) {
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
      onClick={() => id && onClick?.(id)}
    >
      {title}
    </span>
  );
}

export default memo(Tag);