import classNames from '@/utils/classNames';
import { flexColXYCenter } from '@/utils/tailwind';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

function Primary({ children }: PropsWithChildren<{}>) {
  return (
    <main
      className={classNames([
        'min-h-screen bg-primary p-16',
        flexColXYCenter,
        'gap-4',
      ])}
    >
      {children || <Outlet />}
    </main>
  );
}

export default Primary;
