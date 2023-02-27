import Input from '@components/Input';
import { type IInputProps } from '@components/Input/Input';

interface IInputWithErrorProps extends IInputProps {
  errorMessage?: string;
  label?: string;
}

const InputWithError = ({ errorMessage, label, ...props }: IInputWithErrorProps) => {
  return (
    <div className='mb-2'>
      <label>{label}</label>
      <Input {...props} />
      <div className='text-red-700 text-sm pl-2'>{errorMessage ?? ''}&nbsp;</div>
    </div>
  );
};

export default InputWithError;
