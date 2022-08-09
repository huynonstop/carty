import { FormEvent, useRef, useState } from 'react';
import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';
import Button from '@/components/base/Button';
import { useAuthContext } from '@/features/auth/auth.context';
import Spinner from '@/components/Spinner';
import {
  loginRequest,
  signUpRequest,
} from '@/features/auth/auth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const { dispatchLogin } = useAuthContext();
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const toggleLogin = () => {
    setIsLogin((preV) => !preV);
  };
  const submitText = isLogin ? 'Log in' : 'Create account';
  const changeState = isLogin ? (
    <div className="text-gray-500">
      No account?{' '}
      <span
        onClick={toggleLogin}
        className="text-cyan-500 hover:underline cursor-pointer "
      >
        Create one
      </span>
    </div>
  ) : (
    <div className="text-gray-500">
      Already have an account?{' '}
      <span
        onClick={toggleLogin}
        className="text-cyan-500 hover:underline cursor-pointer "
      >
        Log in
      </span>
    </div>
  );
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      email: emailInputRef.current!.value,
      password: passwordInputRef.current!.value,
    };
    setIsLoading(true);
    try {
      const res = await loginRequest(formData);
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message);
      }
      toast.success('Logged in');
      dispatchLogin(data);
      nav('/collections');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      email: emailInputRef.current!.value,
      password: passwordInputRef.current!.value,
    };
    setIsLoading(true);
    try {
      const res = await signUpRequest(formData);
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message);
      }
      toast.success('Your account have been created');
      clearInput();
      setIsLogin(true);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const clearInput = () => {
    emailInputRef.current!.value = '';
    passwordInputRef.current!.value = '';
  };
  return (
    <form
      className={classNames([
        'flex flex-col bg-white rounded',
        'gap-4 p-9 max-w-[400px] w-full',
      ])}
      onSubmit={isLogin ? loginHandler : signUpHandler}
    >
      <input
        ref={emailInputRef}
        className="h-10 px-4 border rounded outline-primary"
        placeholder="Email"
        name="email"
        type="email"
        id="email"
        autoComplete="username"
        autoCorrect="off"
      ></input>
      <input
        ref={passwordInputRef}
        className="h-10 px-4 border rounded outline-primary"
        placeholder="Password"
        name="password"
        type="password"
        id="password"
        autoCorrect="off"
      ></input>
      <Button
        type="submit"
        className={classNames([
          'bg-primary rounded text-white h-9',
          'transition-transform hover:translate-y-1',
        ])}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : submitText}
      </Button>
      <div className={flexXYCenter}>{changeState}</div>
      <div className={flexXYCenter}>
        <div className="text-gray-500">
          <span
            onClick={() => nav('/')}
            className="text-cyan-500 hover:underline cursor-pointer "
          >
            More about Carty
          </span>
        </div>
      </div>
    </form>
  );
}
export default AuthForm;
