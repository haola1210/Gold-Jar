import { type User } from '@contexts/AuthContext';
import { privateInstance } from './axios';

export const me = async () => {
  const { data } = await privateInstance.get('/users/me');
  return data as User;
};

export const deleteNote = async (id?: string) => {
  const { data } = await privateInstance.delete(`note/${id ? id : ``}`);
  return data as User;
};
