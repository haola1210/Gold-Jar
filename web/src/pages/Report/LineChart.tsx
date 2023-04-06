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
import { Line } from 'react-chartjs-2';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', '3', '4'];

export const data1 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 12, 11],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [13, 11, 3, 5],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  return (
    <Line
      options={options}
      data={data1}
    />
  );
};

export default LineChart;
