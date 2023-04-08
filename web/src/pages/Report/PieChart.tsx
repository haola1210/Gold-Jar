import { type MoneyNote } from '@interfaces/money.type';
import { noteReport } from '@services/note.service';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import * as dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import utc from 'dayjs/plugin/utc';
import { ActionType } from '@interfaces/action.type';
import { Currency } from '@interfaces/tag.type';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChartProps {
  date?: Date | null;
}

dayjs.extend(utc);

const PieChart = ({ date }: IPieChartProps) => {
  const [dataOfDate, setDataOfDate] = useState<MoneyNote[]>();
  useEffect(() => {
    const startOfDateMs = dayjs.utc(date).startOf('day').valueOf();
    const endOfDateMs = dayjs.utc(date).endOf('day').valueOf();
    (async () => {
      const data = await noteReport(startOfDateMs, endOfDateMs, 'day');
      setDataOfDate(data);
    })();
  }, [date]);

  const spending = useMemo(() => {
    let totalSpending = 0;
    dataOfDate?.forEach((item) => {
      if (item.type === ActionType.SPENDING) {
        totalSpending += item.amount;
      }
    });
    return totalSpending;
  }, [dataOfDate]);

  const incoming = useMemo(() => {
    let totalSpending = 0;
    dataOfDate?.forEach((item) => {
      if (item.type === ActionType.INCOME) {
        totalSpending += item.amount;
      }
    });
    return totalSpending;
  }, [dataOfDate]);

  const data = {
    labels: ['Thu', 'Chi'],
    datasets: [
      {
        label: Currency.VND,
        data: [spending, incoming],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return incoming + spending === 0 ? (
    <div>
      <div className='pb-2'>Ngày hôm nay không có thu chi gì!</div>
      <div>Vui lòng chọn ngày khác!</div>
    </div>
  ) : (
    <Pie data={data} />
  );
};

export default PieChart;
