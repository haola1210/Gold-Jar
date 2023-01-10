import { type ReactNode } from 'react';

export interface ICollapseProps {
  children: React.ReactNode;
  accordion?: boolean;
}

export type CollapseContextProps = {
  accordion: boolean;
  activeItem: string | number | undefined;
  setActiveItem: React.Dispatch<React.SetStateAction<string | number | undefined>>;
};

export interface IPanelProps {
  header?: ReactNode;
  panelKey: string | number;
  children: ReactNode;
  suffixActive?: ReactNode;
  suffixInactive?: ReactNode;
  emptyChildren?: ReactNode;
}
