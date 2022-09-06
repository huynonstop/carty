import { AuthStateType, createInitAuthState } from './auth.reducer';

const AUTH_LOCAL_STORAGE = 'auth';

export const setAuthDataLocalStorage = (authData: AuthStateType) => {
  localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(authData));
};

export const getAuthDataLocalStorage = (): AuthStateType => {
  try {
    const { userId, accessToken }: AuthStateType = JSON.parse(
      localStorage.getItem(AUTH_LOCAL_STORAGE)!,
    );
    return { userId, accessToken };
  } catch (err) {
    return createInitAuthState();
  }
};

export const clearAuthDataLocalStorage = () => {
  localStorage.removeItem(AUTH_LOCAL_STORAGE);
};
