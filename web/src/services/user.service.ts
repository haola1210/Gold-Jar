import { type User } from '@contexts/AuthContext';
import { privateInstance } from './axios';

export const me = async () => {
  const { data } = await privateInstance.get('/users/me');
  return data as User;
};
