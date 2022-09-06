import classNames from '@/utils/classNames';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import { contentContainer } from '@/utils/tailwind';

function Dashboard({
  children,
  useSidebar = true,
  useSearchBox = true,
  searchBoxPlaceHolder = '',
  logoTo,
  widthClassName = '',
}: PropsWithChildren<{
  useSidebar?: boolean;
  useSearchBox?: boolean;
  logoTo: string;
  widthClassName?: string;
  searchBoxPlaceHolder?: string;
}>) {
  return (
    <>
      <header className="w-full border-b shadow-lg">
        <div className={contentContainer}>
          <NavBar
            searchBoxPlaceHolder={searchBoxPlaceHolder}
            useSidebar={useSidebar}
            logoTo={logoTo}
            useSearchBox={useSearchBox}
          />
        </div>
      </header>
      <main
        className={classNames(['bg-white', 'flex flex-col', 'gap-4'])}
      >
        <div
          className={classNames([
            'flex justify-center w-full mx-auto',
            widthClassName,
          ])}
        >
          {useSidebar && (
            <Sidebar className="flex-auto sticky top-0 index-sidebar-width index-sidebar-height" />
          )}
          {children || <Outlet />}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
