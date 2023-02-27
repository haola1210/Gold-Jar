import { ERROR_TYPE } from '@consts/error-type';

export const converError = (error: any) => {
  const data = error?.response?.data;
  const errorType = data?.error;
  console.log({ errorType }, data?.message);

  let castedErrors = {};
  if (errorType === ERROR_TYPE.CONFLICT) {
    const errorData = JSON.parse(data?.message ?? `{}`);
    castedErrors = Object.keys(errorData).reduce((e, key) => {
      e[key] = `${key} đã tồn tại`;
      return e;
    }, {} as Record<string, string>);
  }

  if (errorType === ERROR_TYPE.NOT_FOUND) {
    if (data?.message === 'User does not exist') {
      castedErrors = { username: 'Không tồn tại tài khoản!' };
    }
  }

  if (errorType === ERROR_TYPE.BAD_REQUEST) {
    if (data?.message === 'Password is not correct') {
      castedErrors = { password: 'Sai mật khẩu!' };
    }
  }

  return castedErrors;
};
