import { API_URL } from '@/config/api';
import { APIRequest, jsonFetch } from '@/utils/fetch';

export const getCollections = (getsData: { accessToken: string }) => {
  return jsonFetch(`${API_URL}/api/collection`, getsData, {
    method: 'GET',
    cache: 'no-cache',
  });
};

export const getCollectionById = ({
  collectionId,
  ...getData
}: {
  accessToken: string;
  collectionId: string;
}) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}`,
    getData,
    { method: 'GET', cache: 'no-cache' },
  );
};

export const getPublicCollectionsByUser = ({
  userId,
  take,
  ...getData
}: {
  userId: string;
  accessToken: string;
  take?: number;
}) => {
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

export const deleteCollection = ({
  collectionId,
  accessToken,
}: {
  accessToken: string;
  collectionId: string;
}) => {
  return jsonFetch(
    `${API_URL}/api/collection/${collectionId}`,
    { accessToken },
    { method: 'DELETE' },
  );
};

export const createCollection = (createData: any) => {
  return jsonFetch(`${API_URL}/api/collection`, createData, {
    method: 'POST',
  });
};

export const cloneCollection = ({
  collectionId,
  accessToken,
}: {
  collectionId: string;
  accessToken: string;
}) => {
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

export const updateCollection: APIRequest<{
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

export const searchCollections: APIRequest<{
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

export const searchUserCollection: APIRequest<{
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
