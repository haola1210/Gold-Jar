import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';

export interface LinkDetail {
  title: string;
  to: string;
}

export interface ActiveColor {
  bg: string;
  text: string;
}

export interface INavBar {
  isRound2Sides?: boolean;
  activeColor?: ActiveColor;
  links: LinkDetail[];
}

const defaultActiveColor = {
  bg: '!bg-green-500',
  text: '!text-gray-100',
};

function Navbar({ isRound2Sides, activeColor = defaultActiveColor, links }: INavBar) {
  return (
    <nav className={`grid grid-rows-1 grid-cols-${links.length} w-fit gap-0.5`}>
      {links.map(({ title, to }, index) => (
        <NavLink
          className={({ isActive }) => `
               p-3 font-semibold
              ${isActive ? activeColor.bg + ' ' + activeColor.text : 'bg-gray-200 text-gray-600'}
              ${isRound2Sides && index === 0 ? 'rounded-l-lg' : ''}
              ${isRound2Sides && index === links.length - 1 ? 'rounded-r-lg' : ''}
            `}
          style={
            {
              // MinWidth: 'max-content',
              // width: `${100 / links.length}%`
            }
          }
          to={to}
          key={uuidv4()}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
