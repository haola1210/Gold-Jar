import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChartProps {
  date?: Date | null;
}

const PieChart = ({ date }: IPieChartProps) => {
  console.log(date);
  const data = {
    labels: ['Thu', 'Chi'],
    datasets: [
      {
        label: '',
        data: [12, 19],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChart;
