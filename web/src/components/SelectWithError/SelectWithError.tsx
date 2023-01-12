import Select from '@components/Select';
import { type ISelectProps } from '@components/Select/Select';

interface ISelectWithErrorProps extends ISelectProps {
  errorMessage?: string;
}

const SelectWitError = ({ errorMessage, ...props }: ISelectWithErrorProps) => {
  return (
    <div className='h-14'>
      <Select {...props} />
      {errorMessage && <div className='text-red-700'>{errorMessage}</div>}
    </div>
  );
};

export default SelectWitError;
