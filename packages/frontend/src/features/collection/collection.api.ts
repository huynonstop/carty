import { API_URL } from '@/config/api';
import { APIRequest, jsonFetch } from '@/utils/fetch';

export const getCollectionsRequest: APIRequest<{
  accessToken: string;
}> = (getsData) => {
  return jsonFetch(`${API_URL}/api/collection`, getsData, {
    method: 'GET',
    cache: 'no-cache',
  });
};

export const getCollectionByIdRequest: APIRequest<{
  accessToken: string;
  collectionId: string;
}> = ({ collectionId, ...getData }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}`,
    getData,
    { method: 'GET', cache: 'no-cache' },
  );
};

export const getPublicCollectionsByUserRequest: APIRequest<{
  userId: string;
  accessToken: string;
  take?: number;
}> = ({ userId, take, ...getData }) => {
  let query = '';
  if (take) {
    query += `?take=${take.toString()}`;
  }
  return jsonFetch(
    `${API_URL}/api/collection/user/${userId}${query}`,
    getData,
    { method: 'GET', cache: 'no-cache' },
  );
};

export const deleteCollectionRequest: APIRequest<{
  accessToken: string;
  collectionId: string;
}> = ({ collectionId, accessToken }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}`,
    { accessToken },
    { method: 'DELETE' },
  );
};

export const createCollectionRequest: APIRequest<any> = (
  createData,
) => {
  return jsonFetch(`${API_URL}/api/collection`, createData, {
    method: 'POST',
  });
};

export const cloneCollectionRequest: APIRequest<{
  collectionId: string;
  accessToken: string;
}> = ({ collectionId, accessToken }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/clone`,
    {
      accessToken,
    },
    {
      method: 'POST',
    },
  );
};

export const updateCollectionRequest: APIRequest<{
  patch: 'name' | 'description' | 'isPublic' | 'tags';
  collectionId: string;
  accessToken: string;
  name?: string;
  description?: string;
  isPublic?: string;
  tags?: string[];
}> = ({ patch, collectionId, ...updateData }) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}/${patch}`,
    updateData,
    { method: 'PATCH' },
  );
};

export const searchCollectionsRequest: APIRequest<{
  accessToken: string;
  key: string;
  cursor?: string;
  take?: number;
  skip?: number;
}> = ({ accessToken, key, take, cursor, skip }) => {
  let query = `?key=${key}`;
  if (take !== undefined) {
    query += `&take=${take.toString()}`;
  }
  if (cursor) {
    query += `&cursor=${cursor}`;
  }
  if (skip !== undefined) {
    query += `&skip=${skip.toString()}`;
  }
  return jsonFetch(
    `${API_URL}/api/collection/search${query}`,
    {
      accessToken,
    },
    { method: 'GET' },
  );
};

export const searchUserCollectionRequest: APIRequest<{
  accessToken: string;
  key: string;
  take?: number;
}> = ({ accessToken, key, take }) => {
  let query = `?key=${key}`;
  if (take) {
    query += `&take=${take.toString()}`;
  }
  return jsonFetch(
    `${API_URL}/api/collection/user-search${query}`,
    {
      accessToken,
    },
    { method: 'GET' },
  );
};
