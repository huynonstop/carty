import prismaClient from '@/lib/prisma';
import { collectionInclude } from '../collection.prisma';
import CollectionService from '../collection.service';
import { CreateItemDTO } from './item.dto';
import {
  buyerInclude,
  deleteItemsInclude,
  collectionItemsInclude,
} from './item.prisma';
const CollectionItemService = {
  async createItem({
    name,
    description,
    price,
    quantity,
    collectionId,
  }: CreateItemDTO) {
    return CollectionService.updatedNowTransaction({
      collectionId,
      operation: prismaClient.item.create({
        data: {
          name,
          description,
          price,
          quantity,
          collectionId,
        },
        include: { ...collectionItemsInclude, ...buyerInclude },
      }),
    });
  },
  async updateItem(
    {
      itemId,
      collectionId,
    }: {
      itemId: string;
      collectionId: string;
    },
    updateData: any,
  ) {
    return CollectionService.updatedNowTransaction({
      collectionId,
      operation: prismaClient.item.update({
        where: {
          id: itemId,
        },
        data: {
          ...updateData,
        },
        include: { ...collectionItemsInclude, ...buyerInclude },
      }),
    });
  },
  async deleteItem({
    itemId,
    collectionId,
  }: {
    itemId: string;
    collectionId: string;
  }) {
    return CollectionService.updatedNowTransaction({
      collectionId,
      operation: prismaClient.item.delete({
        where: {
          id: itemId,
        },
        include: { ...deleteItemsInclude(itemId), ...buyerInclude },
      }),
    });
  },
};
export default CollectionItemService;
