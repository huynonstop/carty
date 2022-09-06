import { MouseEventHandler, PropsWithChildren } from 'react';
import { flexXYCenter } from '@/utils/tailwind';
import classNames from '@/utils/classNames';

import menuIconUrl from '@/assets/menu-icon.svg';
import searchIconUrl from '@/assets/search-icon.svg';
import xIconUrl from '@/assets/x-icon.svg';
import avatarIconUrl from '@/assets/avatar-icon.svg';
import plusIconUrl from '@/assets/plus-icon.svg';
import plusWhiteIconUrl from '@/assets/plus-icon-white.svg';
import collectionIconUrl from '@/assets/collection-icon.svg';
import communityIconUrl from '@/assets/community-icon.svg';
import expandOpenIconUrl from '@/assets/expand-icon-open.svg';
import expandCloseIconUrl from '@/assets/expand-icon-close.svg';
import refreshIconUrl from '@/assets/refresh-icon.svg';
import openIconUrl from '@/assets/open-new-icon.svg';
import connectIconUrl from '@/assets/connect-icon.svg';
import shareIconUrl from '@/assets/share-icon.svg';
import copyIconUrl from '@/assets/copy-icon.svg';
import checkIconUrl from '@/assets/check-icon.svg';
import editIconUrl from '@/assets/edit-icon.svg';
import { Image } from './Image';

const iconMap = {
  menu: menuIconUrl,
  search: searchIconUrl,
  x: xIconUrl,
  avatar: avatarIconUrl,
  plus: plusIconUrl,
  plusWhite: plusWhiteIconUrl,
  collection: collectionIconUrl,
  community: communityIconUrl,
  expandOpen: expandOpenIconUrl,
  expandClose: expandCloseIconUrl,
  refresh: refreshIconUrl,
  open: openIconUrl,
  connect: connectIconUrl,
  share: shareIconUrl,
  copy: copyIconUrl,
  edit: editIconUrl,
  check: checkIconUrl,
  svg: '',
};
type IconType = keyof typeof iconMap;

interface IconProps {
  type: IconType;
  className?: string;
  imgClassName?: string;
  onClick?: MouseEventHandler;
}

function Icon({
  type,
  className = 'w-8 h-8',
  imgClassName = '',
  ...props
}: PropsWithChildren<IconProps>) {
  return (
    <div className={classNames([flexXYCenter, className])} {...props}>
      <Image
        className={imgClassName}
        src={iconMap[type]}
        alt="logo"
      />
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
