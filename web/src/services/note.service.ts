import { type MoneyNote } from '@interfaces/money.type';
import { privateInstance } from './axios';
import { type User } from '@contexts/AuthContext';

const rootPath = 'notes';

export const createNote = async (moneyNote: MoneyNote) => {
  const { data } = await privateInstance.post(`${rootPath}/create-one`, moneyNote);
  return data as MoneyNote;
};

export const getDetail = async (day: string, month: string, year: string) => {
  const data = await privateInstance.get(`${rootPath}?day=${day}&month=${month}&year=${year}`);
  return data;
};

export const getDetailById = async (id: string) => {
  const data = await privateInstance.get(`${rootPath}/${id}`);
  return data.data as MoneyNote;
};

export const updateNote = async (id: string, payload: MoneyNote) => {
  const data = await privateInstance.put(`${rootPath}/${id}`, payload);
  return data.data as MoneyNote;
};

export const getNoteByMonth = async (month: number, year: number) => {
  const data = await privateInstance.get(`${rootPath}/${month}-${year}`);
  return data.data as MoneyNote[];
};

export const deleteNote = async (id?: string) => {
  const { data } = await privateInstance.delete(`${rootPath}/${id ? id : ``}`);
  return data as User;
};
