import { API_URL } from '@/config/api';
import { APIRequest, jsonFetch } from '@/utils/fetch';

export const shareCollectionRequest: APIRequest<{
  collectionId: string;
  accessToken: string;
  email: string;
}> = ({ collectionId, accessToken, email }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/share/email`,
    { accessToken, email },
    {
      method: 'PATCH',
    },
  );
};

export const unshareCollectionRequest: APIRequest<{
  collectionId: string;
  accessToken: string;
  shareId: string;
}> = ({ collectionId, accessToken, shareId }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/share/${shareId}`,
    { accessToken },
    {
      method: 'DELETE',
    },
  );
};

export const getSharedUsersRequest: APIRequest<{
  collectionId: string;
  accessToken: string;
}> = ({ collectionId, accessToken }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/share`,
    { accessToken },
    {
      method: 'GET',
    },
  );
};
