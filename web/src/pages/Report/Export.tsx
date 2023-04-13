import Button from '@components/Button';
import { ActionType } from '@interfaces/action.type';
import { type MoneyNote } from '@interfaces/money.type';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

interface IExportProps {
  data: MoneyNote[];
}

const Export = ({ data }: IExportProps) => {
  const handleExport = () => {
    const dataConvert = [['Loại', 'Số tiền', 'Đơn vị', 'Ngày tạo', 'Mô tả']];
    data.forEach((item) => {
      const type = item.type === ActionType.INCOME ? `Thu` : `Chi`;
      const date = dayjs.utc(item.forDate).format('DD/MM/YYYY');
      dataConvert.push([type, `${item.amount}`, item.unit, date, item.description ?? ``]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(dataConvert);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div className='text-right my-5 mr-5'>
      <Button
        className='block py-2 px-4 bg-green-600 font-bold text-white rounded-lg ml-auto'
        onClick={handleExport}
      >
        Xuất Excel
      </Button>
    </div>
  );
};

export default Export;
