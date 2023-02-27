import { type IAuthRes, type IUserDTO } from '@interfaces/user.type';
import { publicInstance } from './axios';

export const register = async (user: IUserDTO) => {
  const { data } = await publicInstance.post('/auth/register', user);
  return data as IAuthRes;
};
