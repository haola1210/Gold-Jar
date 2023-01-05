export const shalowCompareArray = <T>(baseArr: T[], arr: T[]) => {
  for (const i in baseArr) {
    if (baseArr[i] !== arr[i]) {
      return false;
    }
  }

  return true;
};
