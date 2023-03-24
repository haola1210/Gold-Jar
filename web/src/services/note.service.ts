import { type MoneyNote } from '@interfaces/money.type';
import { privateInstance } from './axios';

export const createNote = async (moneyNote: MoneyNote) => {
  const { data } = await privateInstance.post(`/note`, moneyNote);
  return data as MoneyNote;
};

export const getDetail = async (day: string, month: string, year: string) => {
  const data = await privateInstance.get(`/note?day=${day}&month=${month}&year=${year}`);
  return data;
};

export const getDetailById = async (id: string) => {
  const data = await privateInstance.get(`/note/${id}`);
  return data.data as MoneyNote;
};

export const updateNote = async (id: string, payload: MoneyNote) => {
  const data = await privateInstance.put(`/note/${id}`, payload);
  return data.data as MoneyNote;
};
