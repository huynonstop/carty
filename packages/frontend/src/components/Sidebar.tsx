import classNames from '@/utils/classNames';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { NavLink } from 'react-router-dom';
import Icon from './base/Icon';
import SectionDiv from './base/SectionDiv';
import SelectedCollectionDetails from './collection/SelectedCollectionDetails';

interface SidebarProps {
  className?: string;
}

function Sidebar({ className = '' }: SidebarProps) {
  return (
    <WithClassName
      as="aside"
      className={[className, 'flex flex-col py-2']}
    >
      <div>
        <NavLink
          to="/collections"
          className={({ isActive }: { isActive: boolean }) =>
            classNames([
              'flex items-center gap-1 p-1',
              'hover:bg-slate-100',
              isActive ? 'bg-slate-100' : '',
              'group select-none',
            ])
          }
        >
          <Icon type="collection" />
          <span className="text-sm flex-auto">Collection</span>
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }: { isActive: boolean }) =>
            classNames([
              'flex items-center gap-1 p-1',
              'hover:bg-slate-100',
              isActive ? 'bg-slate-100' : '',
              'select-none',
            ])
          }
        >
          <Icon type="community" />
          <span className="text-sm flex-auto">Community</span>
        </NavLink>
        <SectionDiv className="m-2" />
      </div>
      <SelectedCollectionDetails className="flex flex-col p-1 gap-1" />
    </WithClassName>
  );
}
export default Sidebar;
