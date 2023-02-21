import React from 'react';
import { type ITag } from './types';

function Tag({ className, onClick, active, tag }: ITag) {
  const { title, activeColor, outlineColor } = tag;

  return (
    <span
      className={`rounded-md p-2 font-medium text-sm inline-block text-center text-gray-800 shadow-md ${
        active ? `${activeColor} outline outline-offset-2 ${outlineColor} !text-white` : ''
      }${className ? ' ' + className : ''}`}
      onClick={() => onClick(tag)}
    >
      {title}
    </span>
  );
}

export default Tag;
