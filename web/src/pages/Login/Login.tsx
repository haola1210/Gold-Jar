import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import { type ILoginWithFBUser, type ILoginUser } from '@interfaces/user.type';
import { login, loginWithFacebook } from '@services/auth.service';
import { converError } from '@utils/convertError';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { type ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
const FB_APP_ID = import.meta.env.VITE_FB_APP_ID;

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Vui lòng điền tên đăng nhập!')
    .min(6, 'Tên đăng nhập phải dài hơn 5 ký tự')
    .max(25, 'Tên đăng nhập phải ngắn hơn 26 ký tự'),
  password: Yup.string()
    .trim()
    .required('Vui lòng điền mật khẩu nè!')
    .min(8, 'Mật khẩu phải dài hơn 7 ký tự'),
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
    async onSubmit(value) {
      const user: ILoginUser = {
        username: value.username,
        password: value.password,
      };
      try {
        const { accessToken } = await login(user);
        localStorage.setItem('access_token', accessToken);
        navigate(localStorage.getItem('oldPath') ?? `/`, { replace: true });
        localStorage.removeItem('oldPath');
        toast('Đăng nhập thành công!');
      } catch (error) {
        const errorMessage = converError(error);
        formik.setErrors(errorMessage);
      }
    },
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    void formik.setFieldValue(name, value);
  };

  const handleResLoginFB = async (res: ReactFacebookLoginInfo) => {
    const user: ILoginWithFBUser = {
      username: `FB_USER_${res.userID}`,
      name: res.name ?? `FB_USER_${res.userID}`,
      email: res.email ?? `FB_USER_${res.userID}`,
      linked_fb_userid: res.userID,
      token: res.accessToken,
    };
    try {
      const { accessToken } = await loginWithFacebook(user);
      localStorage.setItem('access_token', accessToken);
      navigate(localStorage.getItem('oldPath') ?? `/`, { replace: true });
      localStorage.removeItem('oldPath');
      toast('Đăng nhập thành công!');
    } catch (error) {
      const errorMessage = converError(error);
      formik.setErrors(errorMessage);
    }
  };

  return (
    <LoginLayout>
      <div>
        <div>
          <H1 className='text-sky-400 pb-4'>Đăng nhập</H1>
        </div>
        <div>
          <InputWithError
            label='Tên Đăng Nhập'
            placeholder='Tên Đăng Nhập'
            name='username'
            onChange={handleChangeInput}
            errorMessage={formik.errors.username}
          />
        </div>
        <div>
          <InputWithError
            label='Mật khẩu'
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
        <FacebookLogin
          appId={FB_APP_ID}
          fields='name,email,picture'
          callback={handleResLoginFB}
          isMobile
          cssClass={`bg-cyan-500 text-white`}
          reAuthenticate
          render={(renderProps) => (
            <Button
              className='bg-cyan-500 text-white'
              style={{
                width: '100px',
              }}
              onClick={renderProps.onClick}
            >
              Facebook
            </Button>
          )}
        />

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
