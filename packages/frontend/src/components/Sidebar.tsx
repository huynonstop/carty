import classNames from '@/utils/classNames';
import { useToggleModal } from '@/utils/hooks/useModal';
import { NavLink } from 'react-router-dom';
import Icon from './base/Icon';
import SectionDiv from './base/SectionDiv';
import CreateCollectionModal from './collection/CreateCollectionModal';

interface SidebarProps {
  className?: string;
}

const sidebarRowClass =
  'group flex items-center gap-1 px-2 select-none';

function Sidebar({ className }: SidebarProps) {
  const [
    isShowCreateCollectionModal,
    closeCreateCollectionModal,
    openCreateCollectionModal,
  ] = useToggleModal(false);
  return (
    <div
      className={classNames([
        className || '',
        'flex flex-col py-2 justify-between',
      ])}
    >
      <div>
        <NavLink
          to="/collections"
          className={({ isActive }) =>
            classNames([
              sidebarRowClass,
              'hover:bg-slate-100',
              isActive ? 'bg-slate-100' : '',
            ])
          }
        >
          <Icon type="collection" />
          <span className="text-sm flex-auto">Collection</span>
          <div className="group-hover:visible rounded invisible hover:bg-slate-200">
            <Icon
              type="plus"
              onClick={(e) => {
                e.preventDefault();
                openCreateCollectionModal();
              }}
            />
          </div>
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            classNames([
              sidebarRowClass,
              'hover:bg-slate-100',
              isActive ? 'bg-slate-100' : '',
            ])
          }
        >
          <Icon type="community" />
          <span className="text-sm flex-auto">Community</span>
        </NavLink>
        <SectionDiv className="m-2" />
      </div>
      <div>
        <SectionDiv className="m-2" />
        <div className={sidebarRowClass}>
          <Icon
            type="expandClose"
            className="rounded hover:bg-slate-200"
          />
          <span className="text-xs flex-auto font-bold">
            Selected collection details
          </span>
        </div>
      </div>
      <CreateCollectionModal
        isShow={isShowCreateCollectionModal}
        onCloseModal={closeCreateCollectionModal}
      />
    </div>
  );
}
export default Sidebar;
