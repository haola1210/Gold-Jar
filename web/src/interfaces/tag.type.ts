// #region TagSelector
export type Tag<T> = {
  id: T;
  title: string;
  description: string;
  color: string;
  activeColor: string;
  outlineColor: string;
};

export enum SpendingTagId {
  EXPENSE = 'EXPENSE',
  SAVING = 'SAVING',
  EDUCATION = 'EDUCATION',
  ENJOYMENT = 'ENJOYMENT',
  INVESTMENT = 'INVESTMENT',
  DONATION = 'DONATION',
}

export enum IncomeTagId {
  SALARY = 'SALARY',
  SUB_JOB = 'SUB_JOB',
  PARENT = 'PARENT',
  UN_INVESTMENT = 'UN_INVESTMENT',
  LOTERY = 'LOTERY',
}

export enum Currency {
  DOLLAR = 'DOLLAR',
  VND = 'VND',
}

export type SpendingTag = Tag<SpendingTagId>;
export type IncomeTag = Tag<IncomeTagId>;

// #endregion
