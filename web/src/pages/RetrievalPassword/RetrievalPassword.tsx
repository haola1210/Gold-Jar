import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import SelectWithError from '@components/SelectWithError';
import { methods } from '@consts/method-list';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const schema = Yup.object({
  username: Yup.string().required('Chưa nhập tài khoản nè!!!'),
  email: Yup.string().required('Chưa nhập email nè!!!').email('Chưa đúng định dạng Email nhaa!!!'),
  phone: Yup.string().required('Chưa nhập số điện thoại nè!!!'),
  byPass: Yup.number().min(0, 'Chưa chọn cách nhận mã tề !!!'),
});

const RetrievalPassword = () => {
  const navigate = useNavigate();
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
      navigate('/identify', { replace: true });
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
      <div>
        <div>
          <H1 className='text-sky-400 pb-4'>Lấy lại mật khẩu</H1>
        </div>
        <div>
          <InputWithError
            placeholder='Tên đăng nhập'
            onChange={handleChangeForm}
            name='username'
            errorMessage={formik.errors.username}
          />
        </div>
        <div>
          <InputWithError
            placeholder='Email'
            onChange={handleChangeForm}
            name='email'
            errorMessage={formik.errors.email}
          />
        </div>
        <div>
          <InputWithError
            placeholder='Số điện thoại'
            onChange={handleChangeForm}
            name='phone'
            errorMessage={formik.errors.phone}
          />
        </div>
        <div>
          <SelectWithError
            options={methods}
            placeholder='Nhận mã qua'
            onChange={handleChangeSelect}
            errorMessage={formik.errors.byPass}
          />
        </div>
        <div className='mt-8 text-right'>
          <Button
            className='bg-cyan-500 text-white mr-4'
            style={{
              width: '100px',
            }}
            onClick={() => navigate('/login')}
          >
            Trang chủ
          </Button>
          <Button
            className='bg-emerald-500 text-white'
            style={{
              width: '100px',
            }}
            onClick={() => formik.handleSubmit()}
          >
            Gửi mã
          </Button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default RetrievalPassword;
