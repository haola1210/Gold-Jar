import Button from '@components/Button';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import SelectWitError from '@components/SelectWithError';
import { methods } from '@consts/method-list';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import * as Yup from 'yup';

const schema = Yup.object({
  username: Yup.string().required('Chưa nhập tài khoản nè!!!'),
  email: Yup.string().required('Chưa nhập email nè!!!').email('Chưa đúng định dạng Email nhaa!!!'),
  phone: Yup.string().required('Chưa nhập số điện thoại nè!!!'),
  byPass: Yup.number().min(0, 'Chưa chọn cách nhận mã tề !!!'),
});

const RetrievalPassword = () => {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      username: '',
      email: '',
      phone: '',
      byPass: -1,
    },
    validationSchema: schema,
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
          errorMessage={formik.errors.username}
        />
        <InputWithError
          placeholder='Email'
          onChange={handleChangeForm}
          name='email'
          errorMessage={formik.errors.email}
        />
        <InputWithError
          placeholder='Số điện thoại'
          onChange={handleChangeForm}
          name='phone'
          errorMessage={formik.errors.phone}
        />
        <SelectWitError
          options={methods}
          className='pb-2'
          placeholder='Nhận mã qua'
          onChange={handleChangeSelect}
          errorMessage={formik.errors.byPass}
        />
        <Button onClick={formik.handleSubmit}>Gửi mã</Button>
      </div>
    </LoginLayout>
  );
};

export default RetrievalPassword;
