import { ERROR_TYPE } from '@consts/error-type';

export const converError = (error: any) => {
  const data = error?.response?.data;
  const errorType = data?.error;
  const errorData = JSON.parse(data?.message ?? `{}`);
  let castedErrors = {};
  if (errorType === ERROR_TYPE.CONFLICT) {
    castedErrors = Object.keys(errorData).reduce((e, key) => {
      e[key] = `${key} đã tồn tại`;
      return e;
    }, {} as Record<string, string>);
  }

  return castedErrors;
};
