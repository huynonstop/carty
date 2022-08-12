import { AuthState, createInitAuthState } from './auth.reducer';

export const AUTH_LOCAL_STORAGE = 'auth';

export const setAuthDataLocalStorage = (authData: AuthState) => {
  localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(authData));
};

export const getAuthDataLocalStorage = (): AuthState => {
  try {
    const { userId, accessToken }: AuthState = JSON.parse(
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
