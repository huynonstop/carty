import { asyncHandler } from '@/utils/asyncHandler';
import { ModuleController } from '@/common/type';
import CollectionService from './collection.service';
import UserService from '@/modules/user/user.service';
import { BadRequest } from '@/utils/customError';

const CollectionController: ModuleController = {
  createCollection: asyncHandler(async (req, res) => {
    const { name, description, isPublic, tags } = req.body;
    const { userId } = res.locals.tokenInfo;
    const newCollection = await CollectionService.createCollection({
      name,
      description,
      isPublic,
      tags,
      ownerId: userId,
    });
    return res.json({
      newCollection,
    });
  }),
  getCollections: asyncHandler(async (req, res) => {
    const { userId } = res.locals.tokenInfo;
    const collections = await CollectionService.getUserCollections({
      userId,
    });
    return res.json({
      collections,
    });
  }),
  getCollection: asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const collection = await CollectionService.getCollectionById({
      collectionId,
    });
    return res.json({
      collection,
    });
  }),
  searchCollections: asyncHandler(async (req, res) => {
    const { key }: { key?: string } = req.query;
    const { userId } = res.locals.tokenInfo;
    const collections = await CollectionService.searchCollection({
      key: key,
      userId,
    });
    return res.json({
      collections,
    });
  }),
  shareCollection: asyncHandler(async (req, res) => {
    const { userId } = res.locals.tokenInfo;
    const { collectionId } = req.params;
    const { email } = req.body;
    const sharedUser = await UserService.getUserByEmail(email);
    if (sharedUser.id === userId) {
      throw new BadRequest('NO_SHARE_OWNER');
    }
    const collectionUser = await CollectionService.shareCollection({
      collectionId,
      userId: sharedUser.id,
    });
    return res.json({ collectionUser });
  }),
};
export default CollectionController;
