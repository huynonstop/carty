import { CreateCollectionDTO } from './collection.dto';
import prismaClient from '@/lib/prisma';
const CollectionService = {
  async createCollection({
    name,
    description,
    ownerId,
    isPublic,
    tags,
  }: CreateCollectionDTO) {
    return prismaClient.collection.create({
      data: {
        name,
        description,
        ownerId,
        isPublic,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: {
              label: tag,
            },
            create: {
              label: tag,
            },
          })),
        },
      },
    });
  },
  async shareCollection({ collectionId, userId }: any) {
    return prismaClient.collectionUser.create({
      data: {
        userId,
        collectionId,
      },
    });
  },
  async publicCollection({ collectionId }: any, { isPublic }: any) {
    return prismaClient.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        isPublic,
      },
    });
  },
};
export default CollectionService;
