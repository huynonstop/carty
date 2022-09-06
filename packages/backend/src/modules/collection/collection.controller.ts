import { asyncHandler } from '@/utils/asyncHandler';
import { ModuleController } from '@/common/type';
import CollectionService from './collection.service';

type CollectionControllerHandler =
  | 'createCollection'
  | 'cloneCollection'
  | 'deleteCollection'
  | 'getCollection'
  | 'getCollections'
  | 'getPublicCollectionsByUser'
  | 'searchCollections'
  | 'searchUserCollection'
  | 'updateCollection'
  | 'updateCollectionTags';

const CollectionController: ModuleController<CollectionControllerHandler> =
  {
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
    cloneCollection: asyncHandler(async (req, res) => {
      const { userId } = res.locals.tokenInfo;
      const { collectionId } = req.params;
      const clonedCollection =
        await CollectionService.cloneCollection({
          collectionId,
          userId,
        });
      return res.json({
        clonedCollection,
      });
    }),
    deleteCollection: asyncHandler(async (req, res) => {
      const { collectionId } = req.params;
      const deletedCollection =
        await CollectionService.deleteCollection({ collectionId });
      return res.json({
        deletedCollection,
      });
    }),
    getCollection: asyncHandler(async (req, res) => {
      const { collectionId } = req.params;
      const collection = await CollectionService.getCollectionById({
        collectionId,
      });
      return res.json({
        collection: {
          ...collection,
        },
        isUser: res.locals.isUser,
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
    getPublicCollectionsByUser: asyncHandler(async (req, res) => {
      const { userId } = req.params;
      const { take }: { take?: string } = req.query;
      const collections =
        await CollectionService.getPublicCollectionsByUser({
          userId,
          take: take ? parseInt(take) : undefined,
        });
      return res.json({
        collections,
      });
    }),
    searchCollections: asyncHandler(async (req, res) => {
      const {
        key,
        cursor,
        take,
        skip,
      }: {
        key?: string;
        cursor?: string;
        take?: string;
        skip?: string;
      } = req.query;
      const collections = await CollectionService.searchCollection({
        key,
        take: take ? parseInt(take) : 10,
        skip: skip ? parseInt(skip) : 1,
        cursor,
      });
      return res.json({
        collections,
      });
    }),
    searchUserCollection: asyncHandler(async (req, res) => {
      const { key, take }: { key?: string; take?: string } =
        req.query;
      const { userId } = res.locals.tokenInfo as { userId: string };
      const collections =
        await CollectionService.searchUserCollection({
          key,
          userId,
          take: take ? parseInt(take) : 5,
        });
      return res.json({
        collections,
      });
    }),
    updateCollection: asyncHandler(async (req, res) => {
      const { collectionId } = req.params;
      const updatedCollection =
        await CollectionService.updateCollection(
          {
            collectionId,
          },
          req.body,
        );
      return res.json({
        updatedCollection,
      });
    }),
    updateCollectionTags: asyncHandler(async (req, res) => {
      const { collectionId } = req.params;
      const { tags } = req.body;
      const [_, updatedCollection] =
        await CollectionService.updateCollectionTags(
          {
            collectionId,
          },
          {
            tags,
          },
        );
      return res.json({
        updatedCollection,
      });
    }),
  };
export default CollectionController;
