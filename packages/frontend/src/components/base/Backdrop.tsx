import classNames from '@/utils/classNames';
import { PropsWithChildren } from 'react';

interface BackdropProps {
  isShow: boolean;
  onClick: () => void;
  className?: string;
}

const Backdrop = ({
  isShow,
  onClick,
  className,
}: PropsWithChildren<BackdropProps>) => {
  return isShow ? (
    <div
      onClick={onClick}
      className={classNames([
        className || '',
        'w-full h-full fixed left-0 top-0 bg-white bg-opacity-70',
      ])}
    />
  ) : null;
};

export default Backdrop;
