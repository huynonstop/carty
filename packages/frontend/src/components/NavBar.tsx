import Logo from '@/components/base/Logo';
import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';
import { Link, NavLink } from 'react-router-dom';
import Icon from './base/Icon';
import { UserSearchBox } from './SearchBox';

function NavBar({
  logoTo,
  useSidebar = true,
  useSearchBox = true,
  searchBoxPlaceHolder = '',
}: {
  logoTo: string;
  useSidebar?: boolean;
  searchBoxPlaceHolder?: string;
  useSearchBox?: boolean;
}) {
  return (
    <nav className="flex items-center justify-between h-12">
      <div
        className={classNames([
          'flex items-center h-full gap-2',
          useSidebar ? 'flex-auto index-sidebar-width' : '',
        ])}
      >
        <Link
          to={logoTo}
          className="flex items-center hover:bg-slate-100 h-full"
        >
          <Logo text="Carty" />
        </Link>
      </div>
      {useSearchBox && (
        <div className="flex basis-1/2 items-center h-full gap-2">
          <UserSearchBox
            className="flex-1"
            placeHolder={searchBoxPlaceHolder}
          />
        </div>
      )}
      <div className="flex items-center h-full gap-2">
        <NavLink
          className={({ isActive }: { isActive: any }) =>
            classNames([
              flexXYCenter,
              'h-full w-12',
              'hover:bg-slate-100',
              isActive ? 'bg-slate-100' : '',
            ])
          }
          to="/user"
        >
          <Icon type="avatar" />
        </NavLink>
      </div>
    </nav>
  );
}
export default NavBar;
