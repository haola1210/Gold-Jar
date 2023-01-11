import Input from '@components/Input';
import { type IInputProps } from '@components/Input/Input';

interface IInputWithErrorProps extends IInputProps {
  errorMessage?: string;
}

const InputWithError = ({ errorMessage, ...props }: IInputWithErrorProps) => {
  return (
    <div className='h-14'>
      <Input {...props} />
      <div className='text-red-700'>{errorMessage}</div>
    </div>
  );
};

export default InputWithError;
