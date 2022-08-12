import { asyncHandler } from '@/utils/asyncHandler';
import { Forbidden } from '@/utils/customError';
import { RequestHandler } from 'express';
import CollectionService from './collection.service';

export const collectionOwnerGuard: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { collectionId } = req.params;
    const { userId } = res.locals.tokenInfo;
    try {
      CollectionService.isOwner({ collectionId, userId });
      return next();
    } catch (err) {
      return next(new Forbidden('NOT_OWNER'));
    }
  },
);

export const collectionUserGuard: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { collectionId } = req.params;
    const { userId } = res.locals.tokenInfo;
    try {
      CollectionService.isUser({ collectionId, userId });
      return next();
    } catch (err) {
      return next(new Forbidden('NOT_USER_COLLECTION'));
    }
  },
);

export const collectionDetailGuard: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { collectionId } = req.params;
    try {
      const collection = await CollectionService.getCollectionById({
        collectionId,
      });
      if (!collection.isPublic) {
        const { userId } = res.locals.tokenInfo;
        CollectionService.isUser({ collectionId, userId });
      }
      return next();
    } catch (err) {
      return next(new Forbidden('COLLECTION_INFO'));
    }
  },
);
