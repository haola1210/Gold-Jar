import Select from '@components/Select';
import { type ISelectProps } from '@components/Select/Select';

interface ISelectWithErrorProps extends ISelectProps {
  errorMessage?: string;
}

const SelectWithError = ({ errorMessage, ...props }: ISelectWithErrorProps) => {
  return (
    <div className=''>
      <Select {...props} />
      {errorMessage && <div className='text-red-700'>{errorMessage}</div>}
    </div>
  );
};

export default SelectWithError;
