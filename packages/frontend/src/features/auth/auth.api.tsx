import { API_URL } from '@/config/api';
import { jsonFetch } from '@/utils/fetch';

export interface LoginResponseData {
  userId: string;
  accessToken: string;
  createdTime: number;
  expiredTime: number;
}

export const loginRequest = (loginData: {
  email: string;
  password: string;
}) => {
  return jsonFetch(
    `${API_URL}/api/auth/login-email-password`,
    loginData,
    {
      method: 'POST',
    },
  );
};

export const signUpRequest = (signUpData: {
  email: string;
  password: string;
}) => {
  return jsonFetch(
    `${API_URL}/api/auth/signup-email-password`,
    signUpData,
    {
      method: 'POST',
    },
  );
};
