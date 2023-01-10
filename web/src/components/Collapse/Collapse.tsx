import React, { useState } from 'react';
import { CollapseContext } from './CollapseContext';
import { type ICollapseProps } from './types';

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
