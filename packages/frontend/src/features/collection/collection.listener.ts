import { Dispatch, useEffect, useSyncExternalStore } from 'react';
import socket from '@/utils/socket';
import { NavigateFunction } from 'react-router-dom';

const syncDisconnected = (callback: () => void) => {
  socket.on('connect', callback);
  socket.on('disconnect', callback);
  return () => {
    socket.on('connect', callback);
    socket.on('disconnect', callback);
  };
};

export const useDisconnectedStatus = () => {
  return useSyncExternalStore(
    syncDisconnected,
    () => socket.disconnected,
  );
};

export const useCollectionListener = (
  setCollection: Dispatch<any>,
  setItems: Dispatch<any[]>,
  fetchCollection: () => void,
  collectionId?: string,
  accessToken?: string,
) => {
  const isDisconnected = useDisconnectedStatus();

  useEffect(() => {
    if (!collectionId) return;
    if (isDisconnected) return;
    let isSub = false;
    let ignoreAuth = false;
    const authSocket = () => {
      socket.emit('auth', { accessToken }, (authAckData: any) => {
        if (!ignoreAuth) {
          socket.emit(
            'collection:sub',
            { collectionId },
            (data: any) => {
              isSub = true;
            },
          );
        }
      });
    };
    // listen to change
    authSocket();
    socket.on('collection:update', ({ collection }) => {
      setCollection(collection);
    });
    socket.on('collection:items:update', ({ items }) => {
      setItems(items);
    });
    socket.on('collection:share:update', () => {
      fetchCollection();
    });
    return () => {
      ignoreAuth = true;
      if (isSub) {
        socket.emit(
          'collection:unsub',
          { collectionId },
          (data: any) => {},
        );
      }
      socket.off('collection:update');
      socket.off('collection:items:update');
      socket.off('collection:share:update');
    };
  }, [collectionId, accessToken, isDisconnected]);

  return isDisconnected;
};
