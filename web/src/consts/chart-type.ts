import { type Option } from '@components/Select/Select';

export enum CHART {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  SIX_MONTHS = 'SIX_MONTHS',
  YEAR = 'YEAR',
}

export enum CHART_OPTIONS {
  THREE_MONTHS = 'THREE_MONTHS',
  WEEK = 'ONE_WEEK',
  MONTH = 'MONTH',
  DAY = 'DAY',
}

export const chartType: Option[] = [
  {
    value: CHART.DAY,
    label: 'Ngày',
  },
  {
    value: CHART.WEEK,
    label: '1 tuần gần nhất',
  },
  {
    value: CHART.MONTH,
    label: '1 tháng gần nhất',
  },
  {
    value: CHART.SIX_MONTHS,
    label: '6 tháng gần nhất',
  },
  {
    value: CHART.YEAR,
    label: '1 năm gần nhất',
  },
];

export const chartOptions: Option[] = [
  {
    value: CHART_OPTIONS.DAY,
    label: 'Ngày',
  },
  {
    value: CHART_OPTIONS.WEEK,
    label: 'Tuần',
  },
  {
    value: CHART_OPTIONS.MONTH,
    label: 'Tháng',
  },
  {
    value: CHART_OPTIONS.THREE_MONTHS,
    label: '3 tháng',
  },
];
