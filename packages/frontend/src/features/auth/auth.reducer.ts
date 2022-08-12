export interface AuthState {
  userId: string;
  accessToken: string;
}

export enum AuthActionType {
  'LOGIN' = 'LOGIN',
  'LOGOUT' = 'LOGOUT',
}

export interface AuthAction {
  type: AuthActionType;
  payload: any;
}

export const createInitAuthState = (): AuthState => {
  return {
    userId: '',
    accessToken: '',
  };
};

export const authReducer = (
  state: AuthState,
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
