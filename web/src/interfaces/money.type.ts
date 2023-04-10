import { type ActionType } from './action.type';
import { type Currency, type IncomeTagId, type SpendingTagId } from './tag.type';

export interface MoneyNote {
  type: ActionType;
  subType: IncomeTagId | SpendingTagId;
  amount: number;
  description?: string;
  unit: Currency;
  forDate: Date;
  _id?: string;
  updateAt?: Date;
  createAt?: Date;
}
