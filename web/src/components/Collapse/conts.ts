import { ActionType } from '@interfaces/action.type';

export const paneHeaderlColorClass = {
  [ActionType.INCOME]: 'bg-green-200 border-2 border-green-600 font-semibold text-green-800',
  [ActionType.SPENDING]: 'bg-red-200 border-2 border-red-600 font-semibold text-red-800',
};

export const paneBodylColorClass = {
  [ActionType.INCOME]: 'bg-green-50 border-2 border-green-600 font-semibold text-sm text-green-800',
  [ActionType.SPENDING]: 'bg-red-50 border-2 border-red-600 font-semibold text-sm text-red-800',
};
