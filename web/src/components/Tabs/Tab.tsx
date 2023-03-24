import React from 'react';
import { useTabContext } from './Tabs';

interface ITabProps {
  children: React.ReactNode;
  id: string | number;
  className?: string;
}

const Tab = ({ children, id, className }: ITabProps) => {
  const { selectedTab, onSelect } = useTabContext();
  return (
    <button
      onClick={() => onSelect(id)}
      className={`${className ?? ``} ${
        selectedTab === id ? `!bg-green-500 !text-gray-100` : ``
      } p-3 font-semibold bg-gray-200 text-gray-600 rounded-xl w-16 text-center my-2 ml-2`}
    >
      {children}
    </button>
  );
};

export default Tab;
