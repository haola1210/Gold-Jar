import { type User } from '@contexts/AuthContext';
import { privateInstance } from './axios';

const usersPath = `/users`;

export const me = async () => {
  const { data } = await privateInstance.get(`${usersPath}/me`);
  return data as User;
};

export const updateUserName = async (payload: { name?: string }) => {
  const { data } = await privateInstance.post(`${usersPath}/change-name`, payload);
  return data as User;
};

export const updateUserPassword = async (payload: { oldPass: string; newPass: string }) => {
  const { data } = await privateInstance.post(`${usersPath}/change-pass`, payload);
  return data as User;
};
