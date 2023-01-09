import { v4 as uuid } from 'uuid'
export const range = (n: number) => [...Array(n).keys()];

export const rangeWithKey = (n: number) => {
  const valAndKey: { value: number, key: string }[] = [];
  for(const v of Array(n).keys()){
    valAndKey.push({
      value: v,
      key: uuid()
    })
  }
  return valAndKey;
}
