import { asyncHandler } from '@/utils/asyncHandler';
import { Forbidden } from '@/utils/customError';
import { RequestHandler } from 'express';
import CollectionService from './collection.service';

export const collectionOwnerGuard: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { collectionId } = req.params;
    const { userId } = res.locals.tokenInfo;
    try {
      await CollectionService.checkOwner({ collectionId, userId });
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
      await CollectionService.checkUser({ collectionId, userId });
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
      const { userId } = res.locals.tokenInfo;
      const isUser = await CollectionService.isUser({
        collectionId,
        userId,
      });
      if (!collection.isPublic && !isUser) {
        throw new Forbidden('NOT_USER_AND_PUBLIC');
      }
      res.locals.isUser = !!isUser;
      return next();
    } catch (err) {
      return next(new Forbidden('COLLECTION_INFO'));
    }
  },
);
