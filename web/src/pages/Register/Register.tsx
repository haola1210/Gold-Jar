import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import { type IUserDTO } from '@interfaces/user.type';
import { useFormik } from 'formik';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '@services/auth.service';
import * as yup from 'yup';
import { converError } from '@utils/convertError';

const schema = yup.object({
  name: yup.string().required('Chưa nhập tên nè !!!').min(3, 'Tên phải dài hơn 2 ký tự'),
  username: yup
    .string()
    .required('Chưa nhập tên đăng nhập nè!!!')
    .min(6, 'Tên đăng nhập phải dài hơn 5 ký tự')
    .max(25, 'Tên đăng nhập phải ngắn hơn 26 ký tự'),
  email: yup.string().required('Chưa nhập email nè!!!').email('Chưa đúng định dạng Email nhaa!!!'),
  password: yup
    .string()
    .trim()
    .required('Chưa nhập password nè!!!')
    .min(8, 'Mật khẩu phải dài hơn 7 ký tự'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Chưa khớp password nè !!'),
});

const Register = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    async onSubmit(values) {
      setIsFetching(true);
      const user: IUserDTO = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      };
      try {
        const { accessToken } = await register(user);
        localStorage.setItem('access_token', accessToken);
        navigate('/');
      } catch (error: any) {
        const castedErrors = converError(error);
        formik.setErrors(castedErrors);
      }

      setIsFetching(false);
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
            disabled={isFetching}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Register;
