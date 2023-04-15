import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import Layout from '@components/Layout';
import { updateUserPassword } from '@services/user.service';
import { useFormik } from 'formik';
import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object({
  oldPassword: yup
    .string()
    .trim()
    .required('Chưa nhập mật khẩu cũ nè!!!')
    .min(8, 'Mật khẩu phải dài hơn 7 ký tự'),
  newPassword: yup
    .string()
    .trim()
    .required('Chưa nhập mật khẩu mới nè!!!')
    .min(8, 'Mật khẩu phải dài hơn 7 ký tự'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Chưa khớp với password mới nè !!'),
});

const ChangePass = () => {
  const navigate = useNavigate();
  const form = useFormik({
    validateOnChange: false,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: schema,
    async onSubmit(value) {
      const payload = {
        oldPass: value.oldPassword,
        newPass: value.newPassword,
      };
      try {
        const user = await updateUserPassword(payload);
        if (user) {
          toast('Cập nhật mật khẩu thành công!');
          navigate('/user-detail');
        } else {
          toast('Có gì đó đang sai!');
        }
      } catch (error) {
        if (error?.response?.data?.statusCode === 404) {
          form.setFieldError(`oldPassword`, `Mật khẩu hiện tại không đúng.`);
        }

        if (error?.response?.data?.statusCode === 409) {
          form.setFieldError(`newPassword`, `Mật khẩu mới đang trùng mật khẩu hiện tại.`);
        }
      }
    },
  });

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    void form.setFieldValue(name, value);
  };

  return (
    <Layout>
      <div style={{ padding: '24px 5px' }}>
        <H1 className='font-medium ml-2 mb-10 text-sky-400'>Thay đổi mật khẩu</H1>
        <div className='mx-2 border-dashed rounded-lg border-2 p-5 text-lg'>
          <div className='mb-4'>
            <div className='font-bold'>Mật khẩu hiện tại:</div>
            <InputWithError
              name='oldPassword'
              value={form.values.oldPassword}
              onChange={handleChangeValue}
              errorMessage={form.errors.oldPassword}
              type='password'
            />
          </div>
          <div className='mb-4'>
            <div className='font-bold'>Mật khẩu mới:</div>
            <InputWithError
              name='newPassword'
              value={form.values.newPassword}
              onChange={handleChangeValue}
              errorMessage={form.errors.newPassword}
              type='password'
            />
          </div>
          <div className='mb-4'>
            <div className='font-bold'>Xác nhận mật khẩu mới:</div>
            <InputWithError
              name='confirmNewPassword'
              value={form.values.confirmNewPassword}
              onChange={handleChangeValue}
              errorMessage={form.errors.confirmNewPassword}
              type='password'
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

export default ChangePass;
