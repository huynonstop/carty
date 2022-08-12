import { MouseEventHandler, PropsWithChildren } from 'react';
import { flexXYCenter } from '@/utils/tailwind';
import menuIconUrl from '@/assets/menu-icon.svg';
import searchIconUrl from '@/assets/search-icon.svg';
import xIconUrl from '@/assets/x-icon.svg';
import avatarIconUrl from '@/assets/avatar-icon.svg';
import plusIconUrl from '@/assets/plus-icon.svg';
import collectionIconUrl from '@/assets/collection-icon.svg';
import communityIconUrl from '@/assets/community-icon.svg';
import expandOpenIconUrl from '@/assets/expand-icon-open.svg';
import expandCloseIconUrl from '@/assets/expand-icon-close.svg';

import classNames from '@/utils/classNames';

const iconMap = {
  menu: menuIconUrl,
  search: searchIconUrl,
  x: xIconUrl,
  avatar: avatarIconUrl,
  plus: plusIconUrl,
  collection: collectionIconUrl,
  community: communityIconUrl,
  expandOpen: expandOpenIconUrl,
  expandClose: expandCloseIconUrl,
  svg: '',
};
type IconType = keyof typeof iconMap;

interface IconProps {
  type: IconType;
  className?: string;
  onClick?: MouseEventHandler;
}

function Icon({
  type,
  className,
  ...props
}: PropsWithChildren<IconProps>) {
  return (
    <div
      className={classNames([flexXYCenter, className || 'w-8 h-8'])}
      {...props}
    >
      <img src={iconMap[type]} alt="logo" />
    </div>
  );
}
export function IconSvg({
  type = 'svg',
  className,
  ...props
}: PropsWithChildren<IconProps>) {
  return (
    <div
      className={classNames([flexXYCenter, className || 'w-8 h-8'])}
      {...props}
    />
  );
}
export default Icon;
