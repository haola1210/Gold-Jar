import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { type ReactNode } from 'react';
import Input from '@components/Input';

interface IDatePickerProps extends ReactDatePickerProps {
  label?: ReactNode;
}

interface IInputDatePickerProps {
  value?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}
const DatePicker = ({ label, ...rest }: IDatePickerProps) => {
  const CustomInput = React.forwardRef(
    ({ value, onClick }: IInputDatePickerProps, ref: React.LegacyRef<HTMLInputElement>) => (
      <Input
        onClick={onClick}
        ref={ref}
        value={value}
      ></Input>
    ),
  );

  return (
    <div>
      {label && <div className='mb-1'>{label}</div>}
      <ReactDatePicker
        dateFormat={'dd/MM/yyyy'}
        customInput={<CustomInput />}
        {...rest}
      />
    </div>
  );
};

export default DatePicker;
