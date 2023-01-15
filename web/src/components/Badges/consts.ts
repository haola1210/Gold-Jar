import { ActionType } from '@interfaces/action.type';

export const mapper = {
  [ActionType.INCOME.toLowerCase()]: 'Thu',
  [ActionType.INCOME]: 'Thu',
  [ActionType.SPENDING.toLowerCase()]: 'Chi',
  [ActionType.SPENDING]: 'Chi',
};
