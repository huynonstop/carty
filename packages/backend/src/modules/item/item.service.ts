import { CreateItemDTO } from './item.dto';
import prismaClient from '@/lib/prisma';
const ItemService = {
  async createItem({
    name,
    description,
    price,
    quantity,
    collectionId,
  }: CreateItemDTO) {
    return prismaClient.item.create({
      data: {
        name,
        description,
        price,
        quantity,
        collectionId,
      },
    });
  },
  async deleteItem({ itemId }: any) {
    return prismaClient.item.delete({
      where: {
        id: itemId,
      },
    });
  },
  async updateItem({ itemId }: any, updateData: any) {
    return prismaClient.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...updateData,
      },
    });
  },
};
export default ItemService;
