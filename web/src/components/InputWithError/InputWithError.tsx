import Input from '@components/Input';
import { type IInputProps } from '@components/Input/Input';

interface IInputWithErrorProps extends IInputProps {
  errorMessage?: string;
}

const InputWithError = ({ errorMessage, ...props }: IInputWithErrorProps) => {
  return (
    <div className='mb-2'>
      <Input {...props} />
      <div className='text-red-700 text-sm pl-2'>{errorMessage ?? ''}&nbsp;</div>
    </div>
  );
};

export default InputWithError;
