import { createContext, useContext } from 'react';

export type CollapseContextProps = {
  accordion: boolean;
  activeItem: string | number | undefined;
  setActiveItem: React.Dispatch<React.SetStateAction<string | number | undefined>>;
};

export const CollapseContext = createContext<undefined | CollapseContextProps>(undefined);

export const useCollapseContext = () => useContext(CollapseContext);
