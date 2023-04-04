import {
  type ILoginUser,
  type IAuthRes,
  type IUserDTO,
  type ILoginWithFBUser,
} from '@interfaces/user.type';
import { publicInstance } from './axios';

export const register = async (user: IUserDTO) => {
  const { data } = await publicInstance.post('/auth/register', user);
  return data as IAuthRes;
};

export const login = async (user: ILoginUser) => {
  const { data } = await publicInstance.post('/auth/login', user);
  return data as IAuthRes;
};

export const loginWithFacebook = async (user: ILoginWithFBUser) => {
  const { data } = await publicInstance.post('/auth/login-with-facebook', user);
  return data as IAuthRes;
};
