import Button from '@components/Button';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import Select from '@components/Select';
import { methods } from '@consts/method-list';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';

const Identify = () => {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      username: '',
      email: '',
      phone: '',
      byPass: -1,
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  const handleChangeSelect = (value: string | number) => {
    void formik.setFieldValue('byPass', value);
  };

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void formik.setFieldValue(name, value);
  };

  return (
    <LoginLayout>
      <div className='p-4'>
        <div>Lấy lại mật khẩu</div>
        <InputWithError
          placeholder='Tên đăng nhập'
          onChange={handleChangeForm}
          name='username'
        />
        <InputWithError
          placeholder='Email'
          onChange={handleChangeForm}
          name='email'
        />
        <InputWithError
          placeholder='Số điện thoại'
          onChange={handleChangeForm}
          name='phone'
        />
        <Select
          options={methods}
          className='pb-2'
          placeholder='Nhận mã qua'
          onChange={handleChangeSelect}
        />
        <Button>Gửi mã</Button>
      </div>
    </LoginLayout>
  );
};

export default Identify;
