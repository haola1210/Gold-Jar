import Select from '@components/Select';
import { type ISelectProps } from '@components/Select/Select';

interface ISelectWithErrorProps extends ISelectProps {
  errorMessage?: string;
}

const SelectWithError = ({ errorMessage, ...props }: ISelectWithErrorProps) => {
  return (
    <div className='mb-2'>
      <Select {...props} />
      <div className='text-red-700 text-sm pl-2'>{errorMessage ?? ''}&nbsp;</div>
    </div>
  );
};

export default SelectWithError;
