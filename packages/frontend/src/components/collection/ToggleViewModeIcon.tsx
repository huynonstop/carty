import { PropsWithChildren } from 'react';
import { flexXYCenter } from '@/utils/tailwind';
import rowIconUrl from '@/assets/row-icon.svg';
import cardIconUrl from '@/assets/card-icon.svg';
import classNames from '@/utils/classNames';

const iconMap = {
  row: (
    <svg
      className="svg"
      width="11"
      height="14"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 13H2v1h14v-1zm0-5H2v1h14V8zm0-5H2v1h14V3z"
        fill-rule="nonzero"
        fill-opacity="1"
        fill="inherit"
        stroke="none"
      ></path>
    </svg>
  ),
  card: (
    <svg
      className="svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1h3v3H1V1zM0 0h5v5H0V0zm1 8h3v3H1V8zM0 7h5v5H0V7zm11-6H8v3h3V1zM8 0H7v5h5V0H8zm0 8h3v3H8V8zM7 7h5v5H7V7z"
        fill-rule="evenodd"
        fill-opacity="1"
        fill="inherit"
        stroke="none"
      ></path>
    </svg>
  ),
};
type IconType = keyof typeof iconMap;

interface IconProps {
  type: IconType;
  className?: string;
  isSelected?: boolean;
}

function ToggleViewModeIcon({
  type,
  className,
  isSelected,
}: PropsWithChildren<IconProps>) {
  const selectedClass = isSelected
    ? 'fill-blue-500 bg-slate-200'
    : 'fill-black';
  return (
    <div
      className={classNames([
        flexXYCenter,
        'w-6 h-6 border border-slate-200 rounded',
        'hover:bg-slate-200',
        selectedClass,
        className || '',
      ])}
    >
      {iconMap[type]}
    </div>
  );
}
export default ToggleViewModeIcon;
