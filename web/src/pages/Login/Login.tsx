import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  username: Yup.string().required('Vui lòng điền tên đăng nhập!'),
  password: Yup.string().required('Vui lòng điền mật khẩu nè!'),
});

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit(value) {
      console.log(value);
      navigate('/spending');
    },
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    void formik.setFieldValue(name, value);
  };

  return (
    <LoginLayout>
      <div>
        <div>
          <H1 className='text-sky-400 pb-4'>Đăng nhập</H1>
        </div>
        <div>
          <InputWithError
            placeholder='Tên Đăng Nhập'
            name='username'
            onChange={handleChangeInput}
            errorMessage={formik.errors.username}
          />
        </div>
        <div>
          <InputWithError
            placeholder='Mật khẩu'
            type='password'
            name='password'
            onChange={handleChangeInput}
            errorMessage={formik.errors.password}
          />
        </div>
      </div>
      <div className='flex justify-between items-end pb-16'>
        <Button
          style={{
            width: '100px',
          }}
          className='text-gray bg-emerald-500 text-white text-base'
          onClick={() => formik.handleSubmit()}
        >
          Đăng nhập
        </Button>
        <div
          className='text-md text-sky-300 font-semibold'
          onClick={() => navigate('/retrieval')}
        >
          Quên mật khẩu?
        </div>
      </div>
      <hr className='w-100 m-auto py-2' />
      <div className='flex gap-12'>
        <Button
          className='bg-emerald-500 text-white'
          style={{
            width: '100px',
          }}
          onClick={() => navigate('/register')}
        >
          Đăng ký
        </Button>
        <Button
          className='bg-cyan-500 text-white'
          style={{
            width: '100px',
          }}
        >
          Facebook
        </Button>
        <Button
          className='bg-red-500 text-white'
          style={{
            width: '100px',
          }}
        >
          Google
        </Button>
      </div>
    </LoginLayout>
  );
};

export default Login;
