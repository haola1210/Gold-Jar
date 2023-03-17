import { type MoneyNote } from '@interfaces/money.type';
import { privateInstance } from './axios';

export const createNote = async (moneyNote: MoneyNote) => {
  const { data } = await privateInstance.post(`/money/note`, moneyNote);
  return data as MoneyNote;
};

export const getDetail = async (day: string, month: string, year: string) => {
  const data = await privateInstance.get(`/money/note?day=${day}&month=${month}&year=${year}`);
  return data;
};
