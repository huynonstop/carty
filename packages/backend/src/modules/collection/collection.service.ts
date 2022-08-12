import { CreateCollectionDTO } from './collection.dto';
import prismaClient from '@/lib/prisma';
const CollectionService = {
  async getUserCollections({ userId }: { userId: string }) {
    return prismaClient.collection.findMany({
      where: {
        OR: [
          {
            ownerId: userId,
          },
          {
            sharedUsers: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      include: {
        sharedUsers: true,
      },
    });
  },
  async getCollectionById({
    collectionId,
  }: {
    collectionId: string;
  }) {
    return prismaClient.collection.findUniqueOrThrow({
      where: {
        id: collectionId,
      },
    });
  },
  async searchCollection({
    key,
    userId,
  }: {
    key?: string;
    userId: string;
  }) {
    const filter: any[] = [
      {
        OR: [
          {
            ownerId: userId,
          },
          {
            sharedUsers: {
              some: {
                userId: userId,
              },
            },
          },
          {
            isPublic: true,
          },
        ],
      },
    ];

    if (key) {
      filter.push({
        OR: [
          {
            name: {
              search: key,
            },
            description: {
              search: key,
            },
          },
          {
            tags: {
              some: {
                label: {
                  search: key,
                },
              },
            },
          },
        ],
      });
    }
    console.log(key);
    return prismaClient.collection.findMany({
      where: {
        AND: filter,
      },
      include: {
        sharedUsers: true,
        tags: true,
      },
    });
  },
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
  async updatePublicCollection(
    { collectionId }: any,
    { isPublic }: any,
  ) {
    return prismaClient.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        isPublic,
      },
    });
  },
  async isOwner({ collectionId, userId }: any) {
    return prismaClient.collection.findFirstOrThrow({
      where: {
        id: collectionId,
        ownerId: userId,
      },
    });
  },
  async isUser({ collectionId, userId }: any) {
    return prismaClient.collection.findFirstOrThrow({
      where: {
        id: collectionId,
        OR: [
          {
            ownerId: userId,
          },
          {
            sharedUsers: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      include: {
        sharedUsers: true,
      },
    });
  },
};
export default CollectionService;
