import Logo from '@/components/base/Logo';
import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';
import Icon from './base/Icon';
import SearchBox from './SearchBox';

function NavBar() {
  return (
    <nav className="flex items-center px-2 justify-between h-12">
      <div className="flex flex-auto index-sidebar-width items-center h-full gap-2">
        <div className="flex items-center hover:bg-slate-100 h-full">
          <Logo text="Carty" />
        </div>
      </div>
      <div className="flex basis-1/2 items-center h-full gap-2">
        <SearchBox className="flex-1" />
      </div>
      <div className="flex items-center h-full gap-2">
        <div
          className={classNames([
            flexXYCenter,
            'h-full w-12',
            'hover:bg-slate-100',
          ])}
        >
          <Icon type="avatar" />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
