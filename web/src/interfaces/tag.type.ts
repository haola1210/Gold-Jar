/* eslint-disable no-unused-vars */

//#region TagSelector
export type Tag<T> = {
  id: T;
  title: string;
  description: string;
  color: string;
  activeColor: string;
  outlineColor: string;
};

export const enum SpendingTagId {
  EXPENSE = 'EXPENSE',
  SAVING = 'SAVING',
  EDUCATION = 'EDUCATION',
  ENJOYMENT = 'ENJOYMENT',
  INVESTMENT = 'INVESTMENT',
  DONATION = 'DONATION',
}

export const enum IncomeTagId {
  SALARY = 'SALARY',
  SUB_JOB = 'SUB_JOB',
  PARENT = 'PARENT',
  UN_INVESTMENT = 'UN_INVESTMENT',
  LOTERY = 'LOTERY',
}

export type SpendingTag = Tag<SpendingTagId>;
export type IncomeTag = Tag<IncomeTagId>;

//#endregion
