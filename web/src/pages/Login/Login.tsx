import Button from '@components/Button';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  username: Yup.string().required('Vui lòng điền tên đăng nhập!'),
  password: Yup.string().required('Vui lòng điền mật khẩu nè!'),
});

const Login = () => {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit(value) {
      console.log(value);
    },
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    void formik.setFieldValue(name, value);
  };

  return (
    <LoginLayout>
      <div className='p-6'>
        <span>Đăng Nhập</span>
        <InputWithError
          placeholder='Tên Đăng Nhập'
          name='username'
          onChange={handleChangeInput}
          errorMessage={formik.errors.username}
        />
        <InputWithError
          placeholder='Mật khẩu'
          type='password'
          name='password'
          onChange={handleChangeInput}
          errorMessage={formik.errors.password}
        />
      </div>
      <Button onClick={formik.handleSubmit}>Đăng nhập</Button>
      <div>Quên mật khẩu?</div>
      <Button>Đăng nhập Bằng Facebook</Button>
      <Button>Đăng nhập Bằng Google</Button>
    </LoginLayout>
  );
};

export default Login;
