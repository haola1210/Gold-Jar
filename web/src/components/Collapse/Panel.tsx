import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useCollapseContext } from './CollapseContext';
import { type IPanelProps } from './types';
import { paneHeaderlColorClass, paneBodylColorClass } from './conts';

const Panel = ({
  header = '',
  suffixActive = <ChevronDownIcon style={{ width: 20, height: 20 }} />,
  suffixInactive = <ChevronUpIcon style={{ width: 20, height: 20 }} />,
  children,
  emptyChildren = <div>No data found</div>,
  type,
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

  const shouldRenderChildren = () => {
    if (value?.accordion) {
      return value?.activeItem === props.panelKey;
    }

    return isShowChildren;
  };

  return (
    <div key={props.panelKey}>
      <div
        onClick={handleOnClick}
        className={`flex rounded-t-lg ${paneHeaderlColorClass[type]} ${
          isShowChildren ? 'active' : ''
        } ${shouldRenderChildren() ? 'border-b-0' : 'rounded-b-lg'}`}
      >
        <div className='p-2'>{header}</div>
        <div className='ml-auto mr-2 my-auto'>
          {shouldRenderChildren() ? suffixInactive : suffixActive}
        </div>
      </div>
      {shouldRenderChildren() && (
        <div className={`flex rounded-b-lg p-2 ${paneBodylColorClass[type]}`}>
          {children ? children : emptyChildren}
        </div>
      )}
    </div>
  );
};

export default Panel;
