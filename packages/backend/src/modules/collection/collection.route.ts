import {
  createCollectionBodyValidator,
  updateCollectionDescriptionValidator,
  updateCollectionNameValidator,
  updateCollectionPublicValidator,
  updateCollectionTagsValidator,
} from './collection.validator';
import {
  tokenGuard,
  validTokenGuard,
} from '@/modules/auth/auth.guard';
import { Router } from 'express';
import CollectionController from './collection.controller';
import {
  collectionOwnerGuard,
  collectionDetailGuard,
  collectionUserGuard,
} from './collection.guard';
import { itemRoute } from './item/item.route';
import { routeParamsMiddleware } from '@/common/middleware';
import ShareController from '../share/share.controller';

export const collectionRoute = Router();
collectionRoute
  .route('/')
  .post(
    tokenGuard,
    validTokenGuard,
    createCollectionBodyValidator,
    CollectionController.createCollection,
  )
  .get(
    tokenGuard,
    validTokenGuard,
    CollectionController.getCollections,
  );

collectionRoute.get(
  '/user/:userId',
  tokenGuard,
  validTokenGuard,
  CollectionController.getPublicCollectionsByUser,
);

collectionRoute.get(
  '/search',
  tokenGuard,
  validTokenGuard,
  CollectionController.searchCollections,
);

collectionRoute.get(
  '/user-search',
  tokenGuard,
  validTokenGuard,
  CollectionController.searchUserCollection,
);

collectionRoute
  .route('/:collectionId')
  .get(
    tokenGuard,
    validTokenGuard,
    collectionDetailGuard,
    CollectionController.getCollection,
  )
  .delete(
    tokenGuard,
    validTokenGuard,
    collectionOwnerGuard,
    CollectionController.deleteCollection,
  );
collectionRoute.post(
  '/:collectionId/clone',
  tokenGuard,
  validTokenGuard,
  collectionDetailGuard,
  CollectionController.cloneCollection,
);
collectionRoute.patch(
  '/:collectionId/name',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  updateCollectionNameValidator,
  CollectionController.updateCollection,
);
collectionRoute.patch(
  '/:collectionId/description',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  updateCollectionDescriptionValidator,
  CollectionController.updateCollection,
);
collectionRoute.patch(
  '/:collectionId/isPublic',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  updateCollectionPublicValidator,
  CollectionController.updateCollection,
);
collectionRoute.patch(
  '/:collectionId/tags',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  updateCollectionTagsValidator,
  CollectionController.updateCollectionTags,
);

collectionRoute.get(
  '/:collectionId/share',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  ShareController.getSharedUsers,
);

collectionRoute.patch(
  '/:collectionId/share/email',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  ShareController.shareCollection,
);

collectionRoute.delete(
  '/:collectionId/share/:shareId',
  tokenGuard,
  validTokenGuard,
  collectionOwnerGuard,
  ShareController.unshareCollection,
);

collectionRoute.use(
  '/:collectionId/item',
  tokenGuard,
  validTokenGuard,
  collectionUserGuard,
  routeParamsMiddleware,
  itemRoute,
);
