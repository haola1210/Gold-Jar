import { ActionType } from '@interfaces/action.type';

export const mapper = {
  [ActionType.INCOME.toLocaleLowerCase()]: 'Thu',
  [ActionType.SPENDING.toLocaleLowerCase()]: 'Chi',
};
