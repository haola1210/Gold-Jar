import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import Layout from '@components/Layout';
import { useAuthContext } from '@contexts/AuthContext';
import { updateUserName } from '@services/user.service';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Chưa nhập tên nè !!!').min(3, 'Tên phải dài hơn 2 ký tự'),
});

const ChangeInfo = () => {
  const navigate = useNavigate();
  const { user, login } = useAuthContext();
  const form = useFormik({
    validateOnChange: false,
    initialValues: {
      name: user?.name,
    },
    validationSchema: schema,
    async onSubmit(value) {
      const payload = {
        name: value.name,
      };
      const user = await updateUserName(payload);
      if (user) {
        toast('Cập nhật tên thành công');
        login?.(user);
        navigate('/user-detail');
      } else {
        toast('Có gì đó đang sai');
      }
    },
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void form.setFieldValue(name, value);
  };

  return (
    <Layout>
      <div style={{ padding: '24px 5px' }}>
        <H1 className='font-medium ml-2 mb-10 text-sky-400'>Thay đổi tên</H1>
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
