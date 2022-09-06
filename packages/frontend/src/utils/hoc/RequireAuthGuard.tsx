import { useAuthContext } from '@/features/auth/auth.context';
import { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface RequireAuthGuardProps {
  to: string;
}

const RequireAuthGuard = ({
  children,
  to = '/auth',
}: PropsWithChildren<RequireAuthGuardProps>) => {
  const { isAuth } = useAuthContext();
  if (!isAuth()) {
    return <Navigate to={to} replace></Navigate>;
  }
  return <>{children || <Outlet />}</>;
};

export default RequireAuthGuard;
