import type dayjs from 'dayjs';
import { type ReactNode } from 'react';
import { type weekDays } from './consts';

export interface ICalendar {
  onChange?: (_value: dayjs.Dayjs | undefined) => void;
  onChangeMonth?: (_value: number) => void;
  onChangeYear?: (_value: number) => void;
  renderInCellThisMonth: (value: number) => ReactNode;
}

export interface ICalendarHeader {
  weekDays: typeof weekDays;
}

export interface IDateCell {
  onClick: () => void;
  className: string;
  date: string | number;
  belowUI?: ReactNode;
}
