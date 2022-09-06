import { API_URL } from '@/config/api';
import { jsonFetch, APIRequest } from '@/utils/fetch';

export const createItem: APIRequest = ({
  collectionId,
  ...createData
}) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/item`,
    createData,
    {
      method: 'POST',
    },
  );
};

export const toggleItem: APIRequest<{
  itemId: string;
  collectionId: string;
  buyerId: string | null;
  accessToken: string;
}> = ({ itemId, collectionId, ...toggleData }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/item/${itemId}`,
    toggleData,
    {
      method: 'PATCH',
    },
  );
};

export const updateItem: APIRequest = ({
  itemId,
  collectionId,
  ...updateData
}) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/item/${itemId}`,
    updateData,
    {
      method: 'PATCH',
    },
  );
};

export const deleteItem: APIRequest<{
  itemId: string;
  collectionId: string;
  accessToken: string;
}> = ({ itemId, collectionId, accessToken }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/item/${itemId}`,
    { accessToken },
    {
      method: 'DELETE',
    },
  );
};
