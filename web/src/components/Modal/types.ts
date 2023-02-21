import { type ReactNode } from 'react';

export interface IModal {
  domNode: HTMLElement;
  component: ReactNode;
  isOpenByDefault?: boolean;
  /**
   * OnClose
   * onOpen
   */
}

type InjectedProps = { isOpen: boolean; toggle: (_v?: boolean) => void };
export type WithModalProps = InjectedProps;

export type ModalRef = { toggleModal: InjectedProps['toggle'] };
