import { API_URL } from '@/config/api';
import { APIRequest, jsonFetch } from '@/utils/fetch';

export const getMostPopularTagsRequest: APIRequest<{
  accessToken: string;
  take?: number;
}> = ({ accessToken, take }) => {
  let query = '';
  if (take) {
    query += `?take=${take.toString()}`;
  }
  return jsonFetch(
    `${API_URL}/api/tag${query}`,
    {
      accessToken,
    },
    {
      method: 'GET',
    },
  );
};
