import { API_URL } from '@/config/api';
import { jsonFetch } from '@/utils/fetch';

export const getUserInfo = () => {
  return jsonFetch(`${API_URL}/api/user`, null, {});
};
