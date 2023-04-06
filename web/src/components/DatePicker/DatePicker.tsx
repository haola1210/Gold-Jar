import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker';
import { DatePickerWrapper } from './styled';
import 'react-datepicker/dist/react-datepicker.css';
import { type ReactNode } from 'react';

interface IDatePickerProps extends ReactDatePickerProps {
  label?: ReactNode;
}
const DatePicker = ({ label, ...rest }: IDatePickerProps) => {
  return (
    <DatePickerWrapper>
      {label && <div className='mb-1'>{label}</div>}
      <ReactDatePicker {...rest} />
    </DatePickerWrapper>
  );
};

export default DatePicker;
