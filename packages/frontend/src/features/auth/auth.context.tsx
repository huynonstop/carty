import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { LoginResponseData } from './auth.api';
import {
  AuthAction,
  AuthActionType,
  authReducer,
  AuthState,
  createInitAuthState,
} from './auth.reducer';

type AuthContextType = {
  authState: AuthState;
  authDispatch: Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType>({
  authState: createInitAuthState(),
  authDispatch: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    null,
    createInitAuthState,
  );
  console.log(authState);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { authState, authDispatch } = useContext(AuthContext);
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
  };
  const dispatchLogout = () => {
    authDispatch({
      type: AuthActionType.LOGOUT,
      payload: {},
    });
  };
  return { authState, authDispatch, dispatchLogin, dispatchLogout };
};
