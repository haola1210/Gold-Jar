import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .required('Chưa nhập tên nè !!!')
    .min(5, 'Tên phải dài hơn 4 ký tự')
    .max(20, 'Tên phải ngắn hơn 20 ký tự'),
  username: yup.string().required('Chưa nhập tên đăng nhập nè!!!'),
  email: yup.string().required('Chưa nhập email nè!!!').email('Chưa đúng định dạng Email nhaa!!!'),
  phone: yup.string().required('Chưa nhập số điện thoại nè!!!'),
  password: yup.string().required('Chưa nhập password nè!!!'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Chưa khớp password nè !!'),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit(values) {
      console.log(values);
      navigate('/login');
    },
  });

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void formik.setFieldValue(name, value);
  };

  return (
    <LoginLayout>
      <div>
        <div>
          <H1 className='text-sky-400 pb-4'>Đăng ký</H1>
        </div>
        <div>
          <InputWithError
            placeholder='Tên'
            name='name'
            errorMessage={formik.errors.name}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <InputWithError
            placeholder='Tên đăng nhập'
            name='username'
            errorMessage={formik.errors.username}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <InputWithError
            placeholder='email'
            name='email'
            errorMessage={formik.errors.email}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <InputWithError
            placeholder='Số điện thoại'
            name='phone'
            errorMessage={formik.errors.phone}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <InputWithError
            placeholder='Mật khẩu'
            name='password'
            type='password'
            errorMessage={formik.errors.password}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <InputWithError
            placeholder='Xác nhận mật khẩu'
            name='confirmPassword'
            type='password'
            errorMessage={formik.errors.confirmPassword}
            onChange={onChangeForm}
          />
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div>
          <div className='text-md text-sky-300 font-semibold'>Đã có tài khoản</div>
          <div className='text-md text-sky-300 font-semibold'>
            Quay lại <b onClick={() => navigate('/login')}>Đăng nhập</b>
          </div>
        </div>
        <div>
          <Button
            className='bg-emerald-500 text-white'
            style={{
              width: '100px',
            }}
            onClick={() => formik.handleSubmit()}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Register;
