import Input from '@components/Input';
import { type IInputProps } from '@components/Input/Input';

interface IInputWithErrorProps extends IInputProps {
  errorMessage?: string;
}

const InputWithError = ({ errorMessage, ...props }: IInputWithErrorProps) => {
  return (
    <>
      <Input {...props} />
      <div>{errorMessage}</div>
    </>
  );
};

export default InputWithError;
