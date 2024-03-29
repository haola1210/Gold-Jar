/**
 * Parent will give Modal the control props (open/close) and anchor dom node
 * Modal show/hide content base on isOpen props
 * Modal will not have any default UI of content, but its child will
 * Modal will render its child in the given dom node
 * Modal will give it child the given control props
 */

import React, {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useReducer,
} from 'react';
import { createPortal } from 'react-dom';
import { type IModal, type ModalRef, type WithModalProps } from './types';

const ModalContext = createContext<undefined | WithModalProps>(undefined);

export const useModalContext = () => useContext(ModalContext);

const Modal = forwardRef<ModalRef, IModal>(
  ({ domNode, component, isOpenByDefault = false }: IModal, ref) => {
    const [shouldOpenSideBar, toggle] = useReducer(
      (prev, v?: boolean) => v ?? !prev,
      isOpenByDefault,
    );

    useImperativeHandle(
      ref,
      () => ({
        toggleModal: toggle,
      }),
      [],
    );

    return (
      <>
        {shouldOpenSideBar &&
          createPortal(
            <>
              <ModalContext.Provider value={{ isOpen: shouldOpenSideBar, toggle }}>
                {component}
              </ModalContext.Provider>
            </>,
            domNode,
          )}
      </>
    );
  },
);

export default Modal;
