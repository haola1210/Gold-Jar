import { type ForDate } from './forDate.type';
import { type Currency, type IncomeTagId, type SpendingTagId } from './tag.type';

export interface MoneyNote {
  type: IncomeTagId | SpendingTagId;
  amount: number;
  description?: string;
  unit: Currency;
  forDate: ForDate;
  _id?: string;
  updateAt?: Date;
  createAt?: Date;
}
