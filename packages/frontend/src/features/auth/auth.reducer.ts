import { MyReducerAction } from '@/utils/types';

export interface AuthStateType {
  userId: string;
  accessToken: string;
}

export const enum AuthActionType {
  'LOGIN' = 'LOGIN',
  'LOGOUT' = 'LOGOUT',
}

export type AuthAction = MyReducerAction<AuthActionType>;

export const createInitAuthState = (): AuthStateType => {
  return {
    userId: '',
    accessToken: '',
  };
};

export const authReducer = (
  state: AuthStateType,
  { type, payload }: AuthAction,
) => {
  switch (type) {
    case AuthActionType.LOGIN:
      return { ...payload };
    case AuthActionType.LOGOUT:
      return createInitAuthState();
    default:
      return state;
  }
};
