/**
 * parent will give Modal the control props (open/close) and anchor dom node
 * Modal show/hide content base on isOpen props
 * Modal will not have any default UI of content, but its child will
 * Modal will render its child in the given dom node
 * Modal will give it child the given control props
 */

import React, { Attributes, cloneElement, isValidElement, ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  domNode: HTMLElement
  children: ReactElement
  isOpen: boolean
  toggle: () => void
  /**
   * onClose
   * onOpen
   */
}

type InjectedProps = Pick<IModal, 'isOpen' | 'toggle'>


const Modal = ({ domNode, children, isOpen, toggle }: IModal) => {

  const wrapper = () => {
    return isValidElement(children) ?
      cloneElement<Partial<unknown> & Attributes & InjectedProps>(children as ReactElement, {
        isOpen,
        toggle
      }) :
      children;
  };

  return (
    <>
      {
        isOpen &&
        createPortal(
          <div>{wrapper()}</div>,
          domNode
        )
      }
    </>
  );
};

export default Modal;