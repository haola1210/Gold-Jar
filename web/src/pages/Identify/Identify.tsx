import Button from '@components/Button';
import H1 from '@components/H1';
import InputWithError from '@components/InputWithError';
import LoginLayout from '@components/LoginLayout';
import Modal, { useModalContext, type ModalRef } from '@components/Modal';
import { useFormik } from 'formik';
import { type ChangeEvent, useRef } from 'react';
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
        <div>
          <H1 className='text-sky-400 pb-4'>Nhập mã xác thực</H1>
        </div>
        <div>
          <InputWithError
            placeholder='Mã'
            errorMessage={formik.errors.passCode}
            name='passCode'
            onChange={onChangePassCode}
          />
        </div>
        <div className='text-right'>
          <Button
            className='bg-cyan-500 text-white mr-4'
            style={{
              width: '100px',
            }}
          >
            Gửi lại mã
          </Button>
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
      <Modal
        ref={modal}
        domNode={document.getElementById('header-menu')!}
        component={<ShowNewPasswordModal />}
      />
    </LoginLayout>
  );
};

const ShowNewPasswordModal = () => {
  const modal = useModalContext();

  return (
    <div
      className='flex justify-center items-center w-screen h-screen '
      style={{ background: '#00000070' }}
      onClick={() => modal?.toggle()}
    >
      <div
        className='h-2/6 w-4/5 bg-white p-4 rounded-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center pb-5 font-semibold'>Mật khẩu mới</div>
        <div className='border-2 rounded-full flex px-4 py-2 justify-between mb-4'>
          <div className='mr-auto w-full text-center'>21312312312321</div>
          <span className='text-md text-sky-300 font-semibold'>Copy</span>
        </div>
        <div className='text-right'>
          <Button
            className='bg-emerald-500 text-white '
            style={{ width: 100 }}
            onClick={() => modal?.toggle()}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Identify;
