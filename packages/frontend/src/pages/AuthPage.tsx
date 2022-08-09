import AuthForm from '@/components/auth/AuthForm';
import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';

function AuthPage() {
  return (
    <>
      <div className={classNames(['w-full rounded', flexXYCenter])}>
        <AuthForm />
      </div>
    </>
  );
}

export default AuthPage;
