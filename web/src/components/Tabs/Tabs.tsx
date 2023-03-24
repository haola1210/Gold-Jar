import { createContext, useContext, type ReactNode } from 'react';

interface ITabsProps {
  children: ReactNode;
  selectedTab: string | number | any;
  onSelect: React.Dispatch<React.SetStateAction<string | number | any>>;
}
type TabContextProps = {
  selectedTab: string | number;
  onSelect: React.Dispatch<React.SetStateAction<string | number>> | ((v: any) => void);
};
const TabContext = createContext<TabContextProps>({
  selectedTab: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelect: (_v: any) => undefined,
});

export const useTabContext = () => useContext(TabContext);

const Tabs = ({ children, selectedTab, onSelect }: ITabsProps) => {
  return <TabContext.Provider value={{ selectedTab, onSelect }}>{children}</TabContext.Provider>;
};

export default Tabs;
