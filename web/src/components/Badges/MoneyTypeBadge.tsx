import React from 'react';
import { type IMoneyTypeBadge } from './types';
import { mapper } from './consts';

const MoneyTypeBadge = ({ tag, type }: IMoneyTypeBadge) => {
  return (
    <span
      className={`inline-block text-white text-xs
      font-medium pb-0.5 px-1.5 rounded-full ${tag.activeColor}`}
    >
      {`${mapper[type]}( ${tag.title.toLowerCase()} )`}
    </span>
  );
};

export default MoneyTypeBadge;
