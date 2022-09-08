import { API_URL } from '@/config/api';
import { jsonFetch, APIRequest } from '@/utils/fetch';

export interface LoginResponseData {
  userId: string;
  accessToken: string;
  createdTime: number;
  expiredTime: number;
}

export const loginRequest: APIRequest<{
  email: string;
  password: string;
}> = (loginData) => {
  return jsonFetch(
    `${API_URL}/api/auth/login-email-password`,
    loginData,
    {
      method: 'POST',
    },
  );
};

export const renewTokenRequest: APIRequest<{
  accessToken: string;
}> = (renewData) => {
  return jsonFetch(`${API_URL}/api/auth/renew-token`, renewData, {
    method: 'GET',
  });
};

export const signUpRequest: APIRequest<{
  email: string;
  password: string;
}> = (signUpData) => {
  return jsonFetch(
    `${API_URL}/api/auth/signup-email-password`,
    signUpData,
    {
      method: 'POST',
    },
  );
};
