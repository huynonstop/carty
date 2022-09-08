import { API_URL } from '@/config/api';
import { APIRequest, jsonFetch } from '@/utils/fetch';

export const getUserInfoRequest: APIRequest<{
  accessToken: string;
}> = ({ accessToken }) => {
  return jsonFetch(
    `${API_URL}/api/user`,
    { accessToken },
    { method: 'GET' },
  );
};

export const getUserInfoByIdRequest: APIRequest<{
  accessToken: string;
  userId: string;
}> = ({ accessToken, userId }) => {
  return jsonFetch(
    `${API_URL}/api/user/${userId}`,
    { accessToken },
    { method: 'GET' },
  );
};

export const setUserNameRequest: APIRequest<{
  accessToken: string;
  name: string;
}> = ({ accessToken, name }) => {
  return jsonFetch(
    `${API_URL}/api/user/`,
    { accessToken, name },
    { method: 'PATCH' },
  );
};
