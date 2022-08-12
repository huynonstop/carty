import {
  tokenGuard,
  validTokenGuard,
} from '@/modules/auth/auth.guard';
import { Router } from 'express';
import CollectionController from './collection.controller';
import {
  collectionOwnerGuard,
  collectionDetailGuard,
} from './collection.guard';

export const collectionRoute = Router();
collectionRoute.post(
  '/',
  tokenGuard,
  validTokenGuard,
  CollectionController.createCollection,
);

collectionRoute.get(
  '/',
  tokenGuard,
  validTokenGuard,
  CollectionController.getCollections,
);

collectionRoute.get(
  '/search',
  tokenGuard,
  validTokenGuard,
  CollectionController.searchCollections,
);

collectionRoute.get(
  '/:collectionId',
  tokenGuard,
  validTokenGuard,
  collectionDetailGuard,
  CollectionController.getCollection,
);

collectionRoute.patch(
  '/:collectionId/share/email',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  CollectionController.shareCollection,
);

collectionRoute.post(
  '/:collectionId/clone',
  tokenGuard,
  validTokenGuard,
  collectionDetailGuard,
);
