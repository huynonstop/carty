import classNames from '@/utils/classNames';
import { flexColXYCenter } from '@/utils/tailwind';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar';

function Dashboard({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <header className="w-full border-b shadow-lg">
        <div className="w-full max-w-screen-xl mx-auto">
          <NavBar />
        </div>
      </header>
      <main
        className={classNames(['bg-white', 'flex flex-col', 'gap-4'])}
      >
        {children || <Outlet />}
      </main>
    </>
  );
}

export default Dashboard;
