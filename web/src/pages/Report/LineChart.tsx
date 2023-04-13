/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable complexity */
import Select from '@components/Select';
import { CHART, chartOptions, chartType, CHART_OPTIONS } from '@consts/chart-type';
import { noteReport } from '@services/note.service';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import utc from 'dayjs/plugin/utc';
import { type MoneyNote } from '@interfaces/money.type';
import { ActionType } from '@interfaces/action.type';
import weekOfYear from 'dayjs/plugin/weekOfYear'; // Import the weekOfYear plugin
import isBetween from 'dayjs/plugin/isBetween';
import Export from './Export';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ILineChartProps {
  chart: CHART;
}

dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

const LineChart = ({ chart }: ILineChartProps) => {
  const [option, setOption] = useState<CHART_OPTIONS | ``>(``);
  const [dataChart, setDataChart] = useState<MoneyNote[]>([]);
  const chartOptionsByChartType = useMemo(() => {
    return chartOptions.filter((item) => {
      switch (chart) {
        case CHART.SIX_MONTHS:
          return item.value !== CHART_OPTIONS.THREE_MONTHS && item.value !== CHART_OPTIONS.DAY;
        case CHART.MONTH:
          return item.value !== CHART_OPTIONS.THREE_MONTHS && item.value !== CHART_OPTIONS.MONTH;
        case CHART.WEEK:
          return (
            item.value !== CHART_OPTIONS.THREE_MONTHS &&
            item.value !== CHART_OPTIONS.MONTH &&
            item.value !== CHART_OPTIONS.WEEK
          );
        case CHART.DAY: {
          return item.value !== '';
        }

        case CHART.YEAR: {
          return item.value === CHART_OPTIONS.THREE_MONTHS || item.value === CHART_OPTIONS.MONTH;
        }

        default:
          return item.value !== '';
      }
    });
  }, [chart]);

  useEffect(() => {
    switch (chart) {
      // Data of 6 months ago
      case CHART.SIX_MONTHS:
        (async () => {
          const dateNow = dayjs.utc(dayjs().format(`MM/DD/YYYY`)).endOf(`day`).valueOf();
          const date6MonthsAgo = dayjs
            .utc(dayjs().subtract(6, `month`).format(`MM/DD/YYYY`))
            .startOf(`day`)
            .valueOf();
          const data = await noteReport(date6MonthsAgo, dateNow);
          setDataChart(data);
        })();

        break;
      case CHART.MONTH:
        (async () => {
          const dateNow = dayjs.utc(dayjs().format(`MM/DD/YYYY`)).endOf(`day`).valueOf();

          const monthAgo = dayjs
            .utc(dayjs().subtract(1, `month`).format(`MM/DD/YYYY`))
            .startOf(`day`)
            .valueOf();
          const data = await noteReport(monthAgo, dateNow);
          setDataChart(data);
        })();

        break;
      case CHART.WEEK:
        (async () => {
          const dateNow = dayjs.utc(dayjs().format(`MM/DD/YYYY`)).endOf(`day`).valueOf();

          const weekAgo = dayjs
            .utc(dayjs().subtract(7, `day`).format(`MM/DD/YYYY`))
            .startOf(`day`)
            .valueOf();
          const data = await noteReport(weekAgo, dateNow);
          setDataChart(data);
        })();

        break;

      case CHART.YEAR:
        (async () => {
          const dateNow = dayjs.utc(dayjs().format(`MM/DD/YYYY`)).endOf(`day`).valueOf();

          const yearAgo = dayjs
            .utc(dayjs().subtract(1, `year`).format(`MM/DD/YYYY`))
            .startOf(`day`)
            .valueOf();
          const data = await noteReport(yearAgo, dateNow);
          setDataChart(data);
        })();

        break;

      default:
        console.log('Not Found Chart');
    }
  }, [chart]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Thống kê ${chartType
          .filter((item) => {
            return item.value === chart;
          })[0]
          ?.label.toLowerCase()}`,
      },
    },
  };

  const chartLabel = () => {
    switch (chart) {
      case CHART.SIX_MONTHS:
        if (option === CHART_OPTIONS.MONTH) {
          const currentDate = dayjs.utc();

          const lastSixMonths = [];

          for (let i = 0; i < 6; i++) {
            const monthAgo = currentDate.subtract(i, 'month');
            const abbreviatedMonth = monthAgo.format('MMM');
            lastSixMonths.push(abbreviatedMonth);
          }

          return lastSixMonths;
        }

        if (option === CHART_OPTIONS.WEEK) {
          let currentDate = dayjs.utc();
          const sixMonthsAgo = currentDate.subtract(6, 'month');
          const weeks = [];

          while (currentDate.isAfter(sixMonthsAgo)) {
            if (currentDate.day() === 1) {
              weeks.push(currentDate.week());
            }

            currentDate = currentDate.subtract(1, 'day');
          }

          return weeks;
        }

        return [];
      case CHART.MONTH:
        if (option === CHART_OPTIONS.WEEK) {
          let currentDate = dayjs.utc();
          const monthAgo = currentDate.subtract(1, 'month');
          const weeks = [];

          while (currentDate.isAfter(monthAgo)) {
            if (currentDate.day() === 1) {
              weeks.push(currentDate.week());
            }

            currentDate = currentDate.subtract(1, 'day');
          }

          return weeks;
        }

        if (option === CHART_OPTIONS.DAY) {
          let currentDate = dayjs.utc();
          const monthAgo = currentDate.subtract(1, 'month');
          const days = [];

          while (currentDate.isAfter(monthAgo)) {
            days.push(currentDate.date());

            currentDate = currentDate.subtract(1, 'day');
          }

          return days;
        }

        return [];
      case CHART.WEEK:
        if (option === CHART_OPTIONS.DAY) {
          let currentDate = dayjs.utc();
          const weekAgo = currentDate.subtract(7, 'day');
          const days = [];

          while (currentDate.isAfter(weekAgo)) {
            days.push(currentDate.date());

            currentDate = currentDate.subtract(1, 'day');
          }

          return days;
        }

        return [];

      case CHART.YEAR:
        if (option === CHART_OPTIONS.THREE_MONTHS) {
          let currentDate = dayjs.utc();
          const yearAgo = currentDate.subtract(1, 'year');
          const threeMonths = [];

          let order = 4;

          while (currentDate.isAfter(yearAgo)) {
            threeMonths.push(order);
            order -= 1;
            currentDate = currentDate.subtract(3, 'month');
          }

          return threeMonths;
        }

        if (option === CHART_OPTIONS.MONTH) {
          let currentDate = dayjs.utc();
          const yearAgo = currentDate.subtract(1, 'year').startOf(`day`);
          const monthList = [];

          while (currentDate.startOf(`day`).isAfter(yearAgo)) {
            monthList.push(currentDate.format('MMM'));
            currentDate = currentDate.subtract(1, `month`);
          }

          return monthList;
        }

        return [];
      default:
        return [];
    }
  };

  const spendingArr = () => {
    switch (chart) {
      case CHART.SIX_MONTHS:
        if (option === CHART_OPTIONS.MONTH) {
          const currentDate = dayjs.utc();

          const lastSixMonths = [];

          for (let i = 0; i < 6; i++) {
            let spending = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).month() === currentDate.subtract(i, `month`).month() &&
                item.type === ActionType.SPENDING
              ) {
                spending += item.amount;
              }
            });
            lastSixMonths.push(spending);
          }

          return lastSixMonths;
        }

        if (option === CHART_OPTIONS.WEEK) {
          let currentDate = dayjs.utc();
          const sixMonthsAgo = currentDate.subtract(6, 'month');
          const lastSixMonths = [];

          while (currentDate.isAfter(sixMonthsAgo)) {
            if (currentDate.day() === 1) {
              let spending = 0;
              dataChart.forEach((item) => {
                if (
                  dayjs.utc(item.forDate).week() === currentDate.week() &&
                  item.type === ActionType.SPENDING
                ) {
                  spending += item.amount;
                }
              });
              lastSixMonths.push(spending);
            }

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastSixMonths;
        }

        return [];
      case CHART.MONTH:
        if (option === CHART_OPTIONS.WEEK) {
          let currentDate = dayjs.utc();
          const monthAgo = currentDate.subtract(1, 'month');
          const lastMonth = [];

          while (currentDate.isAfter(monthAgo)) {
            if (currentDate.day() === 1) {
              let spending = 0;
              dataChart.forEach((item) => {
                if (
                  dayjs.utc(item.forDate).week() === currentDate.week() &&
                  item.type === ActionType.SPENDING
                ) {
                  spending += item.amount;
                }
              });
              lastMonth.push(spending);
            }

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastMonth;
        }

        if (option === CHART_OPTIONS.DAY) {
          let currentDate = dayjs.utc();
          const monthAgo = currentDate.subtract(1, 'month');
          const lastMonth = [];

          while (currentDate.isAfter(monthAgo)) {
            let spending = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).date() === currentDate.date() &&
                dayjs.utc(item.forDate).month() === currentDate.month() &&
                item.type === ActionType.SPENDING
              ) {
                spending += item.amount;
              }
            });
            lastMonth.push(spending);

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastMonth;
        }

        return [];

      case CHART.WEEK:
        if (option === CHART_OPTIONS.DAY) {
          let currentDate = dayjs.utc();
          const weekAgo = currentDate.subtract(7, 'day');
          const lastWeek = [];

          while (currentDate.isAfter(weekAgo)) {
            let spending = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).date() === currentDate.date() &&
                item.type === ActionType.SPENDING
              ) {
                spending += item.amount;
              }
            });
            lastWeek.push(spending);

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastWeek;
        }

        return [];
      case CHART.YEAR:
        if (option === CHART_OPTIONS.THREE_MONTHS) {
          let currentDate = dayjs.utc().endOf('day');
          const yearAgo = currentDate.subtract(1, 'year').startOf('day');
          const threeMonthSpendingList = [];

          while (currentDate.startOf(`day`).isAfter(yearAgo)) {
            let spending = 0;
            const tempTime = currentDate.subtract(3, 'month').startOf('day');
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).isAfter(tempTime) &&
                dayjs.utc(item.forDate).isBefore(currentDate.endOf('day')) &&
                item.type === ActionType.SPENDING
              ) {
                spending += item.amount;
              }
            });
            threeMonthSpendingList.push(spending);

            currentDate = currentDate.subtract(3, 'month');
          }

          return threeMonthSpendingList;
        }

        if (option === CHART_OPTIONS.MONTH) {
          let currentDate = dayjs.utc();
          const yearAgo = currentDate.subtract(1, 'year').startOf(`day`);
          const spendingList = [];
          while (currentDate.startOf(`day`).isAfter(yearAgo)) {
            let spending = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).month() === currentDate.month() &&
                item.type === ActionType.SPENDING
              ) {
                spending += item.amount;
              }
            });
            spendingList.push(spending);
            currentDate = currentDate.subtract(1, 'month');
          }

          return spendingList;
        }

        return [];

      default:
        return [];
    }
  };

  const incomingArr = () => {
    switch (chart) {
      case CHART.SIX_MONTHS:
        if (option === CHART_OPTIONS.MONTH) {
          const currentDate = dayjs.utc();
          const lastSixMonths = [];
          for (let i = 0; i < 6; i++) {
            let incoming = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).month() === currentDate.subtract(i, `month`).month() &&
                item.type === ActionType.INCOME
              ) {
                incoming += item.amount;
              }
            });
            lastSixMonths.push(incoming);
          }

          return lastSixMonths;
        }

        if (option === CHART_OPTIONS.WEEK) {
          let currentDate = dayjs.utc();
          const sixMonthsAgo = currentDate.subtract(6, 'month');
          const lastSixMonths = [];

          while (currentDate.isAfter(sixMonthsAgo)) {
            if (currentDate.day() === 1) {
              let incoming = 0;
              dataChart.forEach((item) => {
                if (
                  dayjs.utc(item.forDate).week() === currentDate.week() &&
                  item.type === ActionType.INCOME
                ) {
                  incoming += item.amount;
                }
              });
              lastSixMonths.push(incoming);
            }

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastSixMonths;
        }

        return [];
      case CHART.MONTH:
        if (option === CHART_OPTIONS.WEEK) {
          let currentDate = dayjs.utc();
          const monthAgo = currentDate.subtract(1, 'month');
          const lastMonth = [];

          while (currentDate.isAfter(monthAgo)) {
            if (currentDate.day() === 1) {
              let incoming = 0;
              dataChart.forEach((item) => {
                if (
                  dayjs.utc(item.forDate).week() === currentDate.week() &&
                  item.type === ActionType.INCOME
                ) {
                  incoming += item.amount;
                }
              });
              lastMonth.push(incoming);
            }

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastMonth;
        }

        if (option === CHART_OPTIONS.DAY) {
          let currentDate = dayjs.utc();
          const monthAgo = currentDate.subtract(1, 'month');
          const lastMonth = [];

          while (currentDate.isAfter(monthAgo)) {
            let incoming = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).date() === currentDate.date() &&
                dayjs.utc(item.forDate).month() === currentDate.month() &&
                item.type === ActionType.INCOME
              ) {
                incoming += item.amount;
              }
            });
            lastMonth.push(incoming);

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastMonth;
        }

        return [];
      case CHART.WEEK:
        if (option === CHART_OPTIONS.DAY) {
          let currentDate = dayjs.utc();
          const weekAgo = currentDate.subtract(7, 'day');
          const lastWeek = [];

          while (currentDate.isAfter(weekAgo)) {
            let incoming = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).date() === currentDate.date() &&
                item.type === ActionType.INCOME
              ) {
                incoming += item.amount;
              }
            });
            lastWeek.push(incoming);

            currentDate = currentDate.subtract(1, 'day');
          }

          return lastWeek;
        }

        return [];

      case CHART.YEAR:
        if (option === CHART_OPTIONS.THREE_MONTHS) {
          let currentDate = dayjs.utc().endOf('day');
          const yearAgo = currentDate.subtract(1, 'year').startOf('day');
          const threeMonthIncomingList = [];

          while (currentDate.startOf(`day`).isAfter(yearAgo)) {
            let incoming = 0;
            const tempTime = currentDate.subtract(3, 'month').startOf('day');
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).isAfter(tempTime) &&
                dayjs.utc(item.forDate).isBefore(currentDate) &&
                item.type === ActionType.INCOME
              ) {
                incoming += item.amount;
              }
            });

            threeMonthIncomingList.push(incoming);

            currentDate = currentDate.subtract(3, 'month');
          }

          return threeMonthIncomingList;
        }

        if (option === CHART_OPTIONS.MONTH) {
          let currentDate = dayjs.utc();
          const yearAgo = currentDate.subtract(1, 'year').startOf(`day`);
          const incomingList = [];
          while (currentDate.startOf(`day`).isAfter(yearAgo)) {
            let spending = 0;
            dataChart.forEach((item) => {
              if (
                dayjs.utc(item.forDate).month() === currentDate.month() &&
                item.type === ActionType.INCOME
              ) {
                spending += item.amount;
              }
            });
            incomingList.push(spending);
            currentDate = currentDate.subtract(1, 'month');
          }

          return incomingList;
        }

        return [];

      default:
        return [];
    }
  };

  const data = () => {
    return {
      labels: chartLabel().reverse(),
      datasets: [
        {
          label: 'Thu',
          data: incomingArr().reverse(),
          borderColor: 'rgb(74 222 128)',
          backgroundColor: 'rgb(220 252 231)',
        },
        {
          label: 'Chi',
          data: spendingArr().reverse(),
          borderColor: 'rgb(248 113 113)',
          backgroundColor: 'rgb(254 226 226)',
        },
      ],
    };
  };

  useEffect(() => {
    setOption(``);
  }, [chart]);

  return (
    <div className=''>
      <div className='mr-5'>
        <Select
          options={chartOptionsByChartType}
          placeholder='Chọn loại'
          onChange={(value) => setOption(value)}
          title={'Chọn loại'}
          value={option}
          defaultValue={``}
        />
      </div>
      {option === `` ? (
        <div className='my-10 text-red-800'>Vui lòng chọn loại biểu đồ</div>
      ) : (
        <div className='mt-10'>
          <Export data={dataChart} />
          <Line
            options={options}
            data={data()}
          />
        </div>
      )}
    </div>
  );
};

export default LineChart;
