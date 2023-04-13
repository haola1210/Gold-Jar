import Button from '@components/Button';
import H1 from '@components/H1';
import Layout from '@components/Layout';
import Select from '@components/Select';
import { CHART, chartType } from '@consts/chart-type';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LineChart = React.lazy(async () => import('./LineChart'));
const PieChart = React.lazy(async () => import('./PieChart'));

const Report = () => {
  const [chart, setChart] = useState<CHART>(CHART.DAY);

  const navigate = useNavigate();

  const renderChart = () => {
    switch (chart) {
      case CHART.DAY:
        return <PieChart />;
      case CHART.WEEK:
      case CHART.MONTH:
      case CHART.SIX_MONTHS:
      case CHART.YEAR:
        return <LineChart chart={chart} />;
      default:
        <PieChart />;
    }
  };

  return (
    <Layout>
      <div>
        <H1 className='ml-2 mt-2'>Thống kê</H1>
        <div className='w-11/12 mx-2 mb-4'>
          <Select
            options={chartType}
            placeholder='Chọn khoảng'
            onChange={(value) => setChart(value)}
            title={'Chọn khoảng'}
            value={chart}
          />
        </div>
        <div className='mx-2'>{renderChart()}</div>
        <div className='mt-4 text-end mr-6'>
          <Button
            className='block py-2 px-4 bg-green-600 font-bold text-white rounded-lg ml-auto'
            onClick={() => navigate(`${localStorage.getItem('oldPath') ?? `/spending`}`)}
          >
            Trang chủ
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
