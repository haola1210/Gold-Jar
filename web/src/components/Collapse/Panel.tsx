import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { useState, type ReactNode } from 'react';
import { useCollapseContext } from './CollapseContext';

interface IPanelProps {
  header?: string;
  panelKey: string | number;
  children: ReactNode;
  suffixActive?: ReactNode;
  suffixInactive?: ReactNode;
  emptyChildren?: ReactNode;
}

const Panel = ({
  header = '',
  suffixActive = <ChevronDownIcon style={{ width: 20, height: 20 }} />,
  suffixInactive = <ChevronUpIcon style={{ width: 20, height: 20 }} />,
  children,
  emptyChildren = <div>No data found</div>,
  ...props
}: IPanelProps) => {
  const [isShowChildren, setIsShowChildren] = useState(false);
  const value = useCollapseContext();

  const handleOnClick = () => {
    setIsShowChildren((prev) => !prev);

    if (value?.accordion) {
      if (value?.activeItem === props.panelKey) {
        value?.setActiveItem(undefined);
      } else {
        value?.setActiveItem(props.panelKey);
      }
    }
  };

  const renderChildren = () => {
    if (value?.accordion) {
      return value?.activeItem === props.panelKey;
    }

    return isShowChildren;
  };

  return (
    <div key={props.panelKey}>
      <div
        onClick={handleOnClick}
        className={`bg-slate-100 border-solid border-2 flex rounded-t-lg border-slate-400 ${
          isShowChildren ? 'active' : ''
        }`}
      >
        <div className='p-2'>{header}</div>
        <div className='ml-auto mr-2 my-auto'>
          {renderChildren() ? suffixInactive : suffixActive}
        </div>
      </div>
      {renderChildren() && (
        <div className='border-solid border-2 flex rounded-b-lg border-slate-400 border-t-0 p-2'>
          {children ? children : emptyChildren}
        </div>
      )}
    </div>
  );
};

export default Panel;
