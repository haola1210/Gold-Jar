import { NavLink } from 'react-router-dom';
import { defaultActiveColor } from './consts';
import { type INavBar } from './types';

function Navbar({
  isRound2Sides,
  activeColor = defaultActiveColor,
  links,
  row = true,
  childClass = '',
}: INavBar) {
  const className = row
    ? `grid grid-rows-1 grid-cols-${links.length} w-fit gap-0.5`
    : `grid grid-cols-1 grid-rows-${links.length} w-full gap-4`;

  return (
    <nav
      style={{ marginBottom: 'auto' }}
      className={className}
    >
      {links.map(({ title, to, key }, index) => (
        <NavLink
          className={({ isActive }) => `
               p-3 font-semibold
              ${isActive ? activeColor.bg + ' ' + activeColor.text : 'bg-gray-200 text-gray-600'}
              ${isRound2Sides && index === 0 ? 'rounded-l-lg' : ''}
              ${isRound2Sides && index === links.length - 1 ? 'rounded-r-lg' : ''}
              ${childClass}
            `}
          to={to}
          key={key}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
