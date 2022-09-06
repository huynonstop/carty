import { MyContextWithDispatchType } from '@/utils/types';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { LoginResponseData, renewTokenRequest } from './auth.api';
import {
  clearAuthDataLocalStorage,
  getAuthDataLocalStorage,
  setAuthDataLocalStorage,
} from './auth.localStorage';
import {
  AuthAction,
  AuthActionType,
  authReducer,
  AuthStateType,
} from './auth.reducer';

type AuthContextType = MyContextWithDispatchType<
  AuthStateType,
  AuthAction
>;

export const AuthContext = createContext<AuthContextType>({
  authState: getAuthDataLocalStorage(),
  authDispatch: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    null,
    getAuthDataLocalStorage,
  );
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
let authTimeout: number | undefined;

export const useAuthContext = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const dispatchLogout = () => {
    authDispatch({
      type: AuthActionType.LOGOUT,
      payload: {},
    });
    clearAuthDataLocalStorage();
    if (authTimeout) {
      console.log('clear timeout', authTimeout);
      clearTimeout(authTimeout);
      authTimeout = undefined;
    }
  };
  const dispatchLogin = ({
    userId,
    accessToken,
    createdTime,
    expiredTime,
  }: LoginResponseData) => {
    authDispatch({
      type: AuthActionType.LOGIN,
      payload: {
        userId,
        accessToken,
      },
    });
    setAuthDataLocalStorage({
      userId,
      accessToken,
    });

    if (authTimeout) {
      console.log('clear auth timeout', authTimeout);
      clearTimeout(authTimeout);
    }

    const timeoutTime = expiredTime - Date.now();
    authTimeout = setTimeout(() => {
      dispatchLogout();
    }, timeoutTime);

    console.log(
      new Date(createdTime).toISOString(),
      'logout after',
      timeoutTime,
      authTimeout,
      'at',
      new Date(expiredTime).toISOString(),
    );
  };

  const isAuth = () => {
    const { accessToken, userId } = authState;
    return accessToken !== '' && userId !== '';
  };
  return {
    authState,
    authDispatch,
    dispatchLogin,
    dispatchLogout,
    isAuth,
  };
};

export const usePersistAuth = () => {
  const { authState, isAuth, dispatchLogin, dispatchLogout } =
    useAuthContext();
  const [isPersistingAuth, setPersistingAuth] = useState(true);

  useEffect(() => {
    const tryPersist = async () => {
      try {
        setPersistingAuth(true);
        if (!isAuth()) {
          throw new Error('CANNOT_PERSIST_AUTH');
        }
        const { accessToken, userId } = authState;
        const res = await renewTokenRequest({ accessToken });
        const data = await res.json();
        if (res.status !== 200) {
          throw new Error('err status');
        }
        console.log('dispatch');
        dispatchLogin({ userId, ...data });
      } catch (err) {
        console.log(err);
        dispatchLogout();
      } finally {
        setPersistingAuth(false);
      }
    };
    tryPersist();
  }, []);

  return isPersistingAuth;
};
