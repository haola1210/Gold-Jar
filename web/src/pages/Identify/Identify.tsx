import Button from '@components/Button';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import Modal, { type ModalRef } from '@components/Modal';
import { useFormik } from 'formik';
import { ChangeEvent, useRef } from 'react';
import * as Yup from 'yup';

const schema = Yup.object({
  passCode: Yup.string().required('Còn trống passcode kìa!'),
});

const Identify = () => {
  const modal = useRef<ModalRef>(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      passCode: '',
    },
    validationSchema: schema,
    onSubmit(values) {
      console.log(values);
      modal.current?.toggleModal();
    },
  });

  const onChangePassCode = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    void formik.setFieldValue(name, value);
  };

  return (
    <LoginLayout>
      <div className='p-4'>
        <div>Nhập mã xác thực</div>
        <InputWithError
          placeholder='Mã'
          errorMessage={formik.errors.passCode}
          name='passCode'
          onChange={onChangePassCode}
        />
        <div>
          <Button>Gửi lại mã</Button>
          <Button onClick={formik.handleSubmit}>Xác nhận</Button>
        </div>
      </div>
      <Modal
        ref={modal}
        domNode={document.getElementById('header-menu')!}
        component={<ShowNewPasswordModal />}
      />
    </LoginLayout>
  );
};

const ShowNewPasswordModal = () => {
  return (
    <div
      className='flex justify-center items-center w-screen h-screen'
      style={{ background: '#00000070' }}
    >
      <div className='h-2/6 w-4/5 bg-white'>
        <div className='text-center pb-5'>Mật khẩu mới</div>
        <div className='border-2 rounded-full text-center'>
          <span className='mr-4'>21312312312321</span>
          <span>Copy</span>
        </div>
      </div>
    </div>
  );
};

export default Identify;
