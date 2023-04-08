import DatePicker from '@components/DatePicker';
import H1 from '@components/H1';
import Layout from '@components/Layout';
import Select from '@components/Select';
import { chartType } from '@consts/chart-type';
import React, { useState } from 'react';

const LineChart = React.lazy(async () => import('./LineChart'));
const PieChart = React.lazy(async () => import('./PieChart'));

const Report = () => {
  const [chart, setChart] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const renderChart = () => {
    switch (chart) {
      case 0:
        return <PieChart date={selectedDate} />;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return <LineChart />;
      default:
        <PieChart />;
    }
  };

  const renderFilter = () => {
    switch (chart) {
      case 0:
        return (
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={(value) => {
                setSelectedDate(value);
              }}
              label={'Chọn ngày'}
            />
          </div>
        );
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return 123;
      default:
        <PieChart />;
    }
  };

  return (
    <Layout>
      <div>
        <H1 className='ml-2'>Thống kê</H1>
        <div className='w-11/12 mx-2 mb-4'>
          <Select
            options={chartType}
            placeholder='Chọn loại'
            onChange={(value) => setChart(Number(value))}
            title={'Chọn loại'}
            value={chart}
          />
        </div>
        <div className='w-11/12 mx-2 mb-4'>{renderFilter()}</div>
        <div className='mx-2'>{renderChart()}</div>
      </div>
    </Layout>
  );
};

export default Report;
