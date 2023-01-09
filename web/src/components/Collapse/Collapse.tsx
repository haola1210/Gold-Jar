import React, { useState } from 'react';
import { CollapseContext } from './CollapseContext';

interface ICollapseProps {
  children: React.ReactNode;
  accordion?: boolean;
}

const Collapse = ({ accordion = false, children }: ICollapseProps) => {
  const [activeItem, setActiveItem] = useState<string | number | undefined>(undefined);
  return (
    <div>
      <CollapseContext.Provider value={{ accordion, activeItem, setActiveItem }}>
        <div className='flex flex-col gap-6 px-2'>{children}</div>
      </CollapseContext.Provider>
    </div>
  );
};

export default Collapse;
