import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import Layout from '@components/Layout';
import { useAuthContext } from '@contexts/AuthContext';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Chưa nhập tên nè !!!').min(3, 'Tên phải dài hơn 2 ký tự'),
  username: yup
    .string()
    .required('Chưa nhập tên đăng nhập nè!!!')
    .min(6, 'Tên đăng nhập phải dài hơn 5 ký tự')
    .max(25, 'Tên đăng nhập phải ngắn hơn 26 ký tự'),
  email: yup.string().required('Chưa nhập email nè!!!').email('Chưa đúng định dạng Email nhaa!!!'),
});

const ChangeInfo = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const form = useFormik({
    validateOnChange: false,
    initialValues: {
      name: user?.name,
      email: user?.email,
    },
    validationSchema: schema,
    onSubmit(value) {
      console.log(value);
    },
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void form.setFieldValue(name, value);
  };

  return (
    <Layout>
      <div style={{ padding: '24px 5px' }}>
        <H1 className='font-medium ml-2 mb-10 text-sky-400'>Thay đổi thông tin tài khoản</H1>
        <div className='mx-2 border-dashed rounded-lg border-2 p-5 text-lg'>
          <div className='mb-4'>
            <div className='font-bold'>Tên:</div>
            <InputWithError
              name='name'
              value={form.values.name}
              onChange={handleChangeValue}
              errorMessage={form.errors.name}
            />
          </div>
          <div className='mb-4'>
            <div className='font-bold'>Email:</div>
            <InputWithError
              name='email'
              value={form.values.email}
              onChange={handleChangeValue}
              errorMessage={form.errors.email}
            />
          </div>
          <div className='flex justify-end mt-4 gap-2'>
            <Button
              className='block py-2 px-4 bg-green-600 font-bold text-white rounded-lg'
              onClick={() => form.handleSubmit()}
            >
              Cập nhật
            </Button>
            <Button
              className='block py-2 px-4 bg-green-600 font-bold text-white rounded-lg'
              onClick={() => navigate('/user-detail')}
            >
              Trở lại
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangeInfo;
