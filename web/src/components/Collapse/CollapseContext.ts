import { createContext, useContext } from 'react';
import { type CollapseContextProps } from './types';

export const CollapseContext = createContext<undefined | CollapseContextProps>(undefined);

export const useCollapseContext = () => useContext(CollapseContext);
