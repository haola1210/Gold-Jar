import { incomeList } from '@consts/income-list';
import { spendingList } from '@consts/spending-list';
import { ActionType } from '@interfaces/action.type';
export const mapper = {
  [ActionType.INCOME.toLowerCase()]: () => incomeList,
  [ActionType.INCOME]: () => incomeList,
  [ActionType.SPENDING.toLowerCase()]: () => spendingList,
  [ActionType.SPENDING]: () => spendingList,
};
