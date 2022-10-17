import React from 'react';
import { ActionType, IncomeTag, SpendingTag } from '@types';

export interface IMoneyTypeBadge {
  tag: IncomeTag | SpendingTag
  type: ActionType
}

const mapper = {
  [ActionType.INCOME.toLocaleLowerCase()]: 'Thu',
  [ActionType.SPENDING.toLocaleLowerCase()]: 'Chi',
};

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