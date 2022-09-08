import { useAuthContext } from '@/features/auth/auth.context';
import {
  cloneCollectionRequest,
  deleteCollectionRequest,
  getCollectionByIdRequest,
  updateCollectionRequest,
} from '@/features/collection/collection.api';
import { useCollectionListener } from '@/features/collection/collection.listener';
import {
  createItemRequest,
  deleteItemRequest,
  toggleItemRequest,
  updateItemRequest,
} from '@/features/item/item.api';
import { useItemsContext } from '@/features/item/items.context';
import { useFetch } from '@/utils/hooks/useFetch';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useCollectionDetailPageData = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { authState, isAuth } = useAuthContext();
  const { items, setItems } = useItemsContext();
  const [isUser, setIsUser] = useState(false);
  const [collection, wrapper, { setData: setCollection, loading }] =
    useFetch<any>(null);

  const fetchCollection = useCallback(() => {
    if (isAuth())
      wrapper(
        getCollectionByIdRequest,
        {
          accessToken: authState.accessToken,
          collectionId,
        },
        undefined,
        (c) => {
          setCollection(c.collection);
          setItems(c.collection.items);
          setIsUser(c.isUser);
        },
        false,
        (err) => {
          navigate('/collections', { replace: true });
        },
      );
  }, [collectionId, isAuth]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  const isDisconnected = useCollectionListener(
    setCollection,
    setItems,
    fetchCollection,
    collectionId,
    authState.accessToken,
  );

  const deleteCollection = async () => {
    if (!collectionId) return;
    try {
      const res = await deleteCollectionRequest({
        collectionId,
        accessToken: authState.accessToken,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      toast.success('Deleted collection');
      navigate('/collections', { replace: true });
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const editCollection =
    (patch: 'name' | 'description' | 'isPublic' | 'tags') =>
    async (data: any) => {
      if (!collectionId) return;
      try {
        const res = await updateCollectionRequest({
          patch,
          accessToken: authState.accessToken,
          collectionId,
          [patch]: data,
        });
        const resData = await res.json();
        if (res.status !== 200) {
          throw data;
        }
        if (isDisconnected) {
          setCollection(resData.updatedCollection);
        }
      } catch (err) {
        throw err;
      }
    };

  const cloneThisCollection = async () => {
    if (!collectionId) return;
    try {
      const res = await cloneCollectionRequest({
        collectionId,
        accessToken: authState.accessToken,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      navigate(`/collections/${data.clonedCollection.id}`);
    } catch (err) {
      toast.error('Clone fail');
    }
  };

  const toggleItem = async ({
    checked,
    itemId,
  }: {
    checked: boolean;
    itemId: string;
  }) => {
    if (!collectionId) return;
    try {
      const res = await toggleItemRequest({
        itemId,
        collectionId,
        accessToken: authState.accessToken,
        buyerId: checked ? authState.userId : null,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      if (isDisconnected) {
        setCollection(data.collection);
        setItems(data.collection.items);
      }
    } catch (err) {
      throw err;
    }
  };

  const editItem = async ({ canBuy, ...data }: any) => {
    if (!collectionId) return;
    try {
      const res = await updateItemRequest({
        collectionId,
        accessToken: authState.accessToken,
        buyerId: canBuy ? authState.userId : null,
        ...data,
      });
      const resData = await res.json();
      if (resData.status !== 200) {
        throw data;
      }
      if (isDisconnected) {
        setCollection(data.collection);
        setItems(data.collection.items);
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteItem = async ({ itemId }: { itemId: string }) => {
    if (!collectionId) return;
    try {
      const res = await deleteItemRequest({
        collectionId,
        itemId,
        accessToken: authState.accessToken,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      if (isDisconnected) {
        setCollection(data.collection);
        setItems(data.collection.items);
      }
    } catch (err) {
      throw err;
    }
  };

  const createItem = async ({
    name,
    quantity,
    price,
    description,
  }: {
    name: string;
    quantity: number;
    price: number;
    description: string;
  }) => {
    try {
      const res = await createItemRequest({
        name,
        quantity,
        price,
        description,
        accessToken: authState.accessToken,
        collectionId,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      if (isDisconnected) {
        setCollection(data.collection);
        setItems(data.collection.items);
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    navigate,
    authState,
    collection,
    items,
    isUser,
    loading,
    collectionId,
    editCollection,
    cloneThisCollection,
    deleteCollection,
    createItem,
    editItem,
    toggleItem,
    deleteItem,
  };
};
