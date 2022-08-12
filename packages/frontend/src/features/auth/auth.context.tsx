import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useRef,
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
  AuthState,
} from './auth.reducer';

type AuthContextType = {
  authState: AuthState;
  authDispatch: Dispatch<AuthAction>;
};

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
  const isInit = useRef(true);
  useEffect(() => {
    if (isInit.current) {
      console.log('Init auth state', authState);
      isInit.current = false;
    } else {
      console.log('Updated auth state', authState);
    }
  });
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
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
      console.log('clear timeout', authTimeout);
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
    const tryPersistAuth = async () => {
      try {
        if (!isAuth()) {
          throw new Error('CANNOT_PERSIST_AUTH');
        }
        const { accessToken, userId } = authState;
        const res = await renewTokenRequest({ accessToken });
        const data = await res.json();
        if (res.status !== 200) {
          console.log(data);
          throw new Error('err status');
        }
        dispatchLogin({ userId, ...data });
      } catch (err) {
        console.log(err);
        dispatchLogout();
        return;
      } finally {
        setPersistingAuth(false);
      }
    };
    tryPersistAuth();
  }, []);
  return isPersistingAuth;
};
