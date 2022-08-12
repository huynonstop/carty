import classNames from '@/utils/classNames';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';

function Dashboard({
  children,
  useSidebar = true,
  logoTo,
}: PropsWithChildren<{ useSidebar?: boolean; logoTo: string }>) {
  return (
    <>
      <header className="w-full border-b shadow-lg">
        <div className="w-full max-w-screen-xl mx-auto">
          <NavBar useSidebar={useSidebar} logoTo={logoTo} />
        </div>
      </header>
      <main
        className={classNames(['bg-white', 'flex flex-col', 'gap-4'])}
      >
        <div className="flex justify-center w-full max-w-screen-xl mx-auto">
          {useSidebar && (
            <Sidebar className="flex-auto index-sidebar-width index-sidebar-height border-r" />
          )}
          {children || <Outlet />}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
