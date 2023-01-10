import { type IncomeTag, type SpendingTag } from '@interfaces/tag.type';
import { type ActionType } from '@interfaces/action.type';

export interface IMoneyTypeBadge {
  tag: IncomeTag | SpendingTag;
  type: ActionType;
}
