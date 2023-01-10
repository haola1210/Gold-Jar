import type dayjs from 'dayjs';
import { type weekDays } from './consts';

export interface ICalendar {
  onChange?: (_value: dayjs.Dayjs | undefined) => void;
}

export interface ICalendarHeader {
  weekDays: typeof weekDays;
}

export interface IDateCell {
  onClick: () => void;
  className: string;
  date: string | number;
}
