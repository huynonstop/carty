import { Collection } from '@prisma/client';
import { ModuleController } from '@/common/type';
import { useIO } from '@/lib/socket';
import { asyncHandler } from '@/utils/asyncHandler';
import CollectionItemService from './item.service';

type CollectionItemControllerHandler =
  | 'createItem'
  | 'updateItem'
  | 'deleteItem';
const CollectionItemController: ModuleController<CollectionItemControllerHandler> =
  {
    createItem: asyncHandler(async (req, res) => {
      const { name, description, price, quantity } = req.body;
      const { collectionId } = res.locals.route.params;
      const [newItem, collection] =
        await CollectionItemService.createItem({
          name,
          description,
          price,
          quantity,
          collectionId,
        });
      useIO((io) => {
        io.to(collectionId).emit('collection:update', {
          collection,
        });
        io.to(collectionId).emit('collection:items:update', {
          items: (collection as Collection & { items: any[] }).items,
        });
      });
      return res.json({
        collection,
        newItem,
      });
    }),
    updateItem: asyncHandler(async (req, res) => {
      const { name, description, price, quantity, buyerId } =
        req.body;
      const { collectionId } = res.locals.route.params;
      const { itemId } = req.params;
      const [editedItem, collection] =
        await CollectionItemService.updateItem(
          { collectionId, itemId },
          {
            name,
            description,
            price,
            quantity,
            buyerId,
          },
        );
      useIO((io) => {
        io.to(collectionId).emit('collection:update', {
          collection,
        });
        io.to(collectionId).emit('collection:items:update', {
          items: (collection as Collection & { items: any[] }).items,
        });
      });
      return res.json({
        collection,
        editedItem,
      });
    }),
    deleteItem: asyncHandler(async (req, res) => {
      const { itemId } = req.params;
      const { collectionId } = res.locals.route.params;
      const [deletedItem, collection] =
        await CollectionItemService.deleteItem({
          itemId,
          collectionId,
        });
      useIO((io) => {
        io.to(collectionId).emit('collection:update', {
          collection,
        });
        io.to(collectionId).emit('collection:items:update', {
          items: (collection as Collection & { items: any[] }).items,
        });
      });
      return res.json({
        collection,
        deletedItem,
      });
    }),
  };

export default CollectionItemController;
