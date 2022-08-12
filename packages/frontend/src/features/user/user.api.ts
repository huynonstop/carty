import { API_URL } from '@/config/api';
import { jsonFetch } from '@/utils/fetch';

export const getUserInfo = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  return jsonFetch(
    `${API_URL}/api/user`,
    { accessToken },
    { method: 'GET' },
  );
};

export const getUserInfoById = ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) => {
  return jsonFetch(
    `${API_URL}/api/user/${userId}`,
    { accessToken },
    { method: 'GET' },
  );
};

export const setUserName = ({
  accessToken,
  name,
}: {
  accessToken: string;
  name: string;
}) => {
  return jsonFetch(
    `${API_URL}/api/user/`,
    { accessToken, name },
    { method: 'PATCH' },
  );
};
