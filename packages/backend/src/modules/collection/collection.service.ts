import { Collection } from '@prisma/client';
import { CreateCollectionDTO } from './collection.dto';
import prismaClient, { orderByCreatedAt } from '@/lib/prisma';
import {
  collectionInclude,
  searchCollectionByKeyFilter,
  searchCollectionByKeyWithoutPublicFilter,
} from './collection.prisma';

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
      include: collectionInclude,
      orderBy: orderByCreatedAt as any,
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
      include: collectionInclude,
    });
  },
  async deleteCollection({ collectionId }: { collectionId: string }) {
    return prismaClient.collection.delete({
      where: {
        id: collectionId,
      },
      include: collectionInclude,
    });
  },
  async searchCollection({
    key,
    cursor,
    take,
    skip,
  }: {
    key?: string;
    cursor?: string;
    take?: number;
    skip?: number;
  }) {
    return prismaClient.collection.findMany({
      take,
      skip,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      where: {
        AND: searchCollectionByKeyFilter(key),
      },
      include: collectionInclude,
      orderBy: {
        id: 'desc',
      },
    });
  },
  async searchUserCollection({
    userId,
    key,
    take,
  }: {
    userId: string;
    key?: string;
    take?: number;
  }) {
    return prismaClient.collection.findMany({
      where: {
        AND: searchCollectionByKeyWithoutPublicFilter(userId, key),
      },
      take,
      include: collectionInclude,
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
  async cloneCollection({
    collectionId,
    userId,
  }: {
    collectionId: string;
    userId: string;
  }) {
    const { name, description, tags, items } =
      (await CollectionService.getCollectionById({
        collectionId,
      })) as Collection & { tags: any[]; items: any[] };
    return prismaClient.collection.create({
      data: {
        name: `${name} clone`,
        description,
        ownerId: userId,
        isPublic: false,
        tags: {
          connectOrCreate: tags.map(({ label }) => ({
            create: {
              label,
            },
            where: {
              label,
            },
          })),
        },
        items: {
          createMany: {
            data: items.map(
              ({ name, description, price, quantity }) => ({
                name,
                description,
                price,
                quantity,
              }),
            ),
          },
        },
      },
    });
  },
  async getPublicCollectionsByUser({
    userId,
    take,
  }: {
    userId: string;
    take?: number;
  }) {
    return prismaClient.collection.findMany({
      where: {
        isPublic: true,
        ownerId: userId,
      },
      take,
    });
  },
  async checkOwner({ collectionId, userId }: any) {
    return prismaClient.collection.findFirstOrThrow({
      where: {
        id: collectionId,
        ownerId: userId,
      },
    });
  },
  async checkPublicOrUser({ collectionId, userId }: any) {
    return prismaClient.collection.findFirstOrThrow({
      where: {
        id: collectionId,
        OR: [
          { isPublic: true },
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
  async isUser({ collectionId, userId }: any) {
    return prismaClient.collection.findFirst({
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
  async checkUser({ collectionId, userId }: any) {
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
  async updatedNowTransaction({
    collectionId,
    operation,
  }: {
    collectionId: string;
    operation: any;
  }) {
    return prismaClient.$transaction([
      operation,
      prismaClient.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          updatedAt: new Date(),
        },
        include: collectionInclude,
      }),
    ]);
  },
  async updateCollection(
    { collectionId }: { collectionId: string },
    updateData: any,
  ) {
    return prismaClient.collection.update({
      where: {
        id: collectionId,
      },
      data: updateData,
      include: collectionInclude,
    });
  },
  async updateCollectionTags(
    { collectionId }: { collectionId: string },
    { tags }: { tags: string[] },
  ) {
    return prismaClient.$transaction([
      prismaClient.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          tags: {
            set: [],
          },
        },
      }),
      prismaClient.collection.update({
        where: {
          id: collectionId,
        },
        data: {
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
        include: collectionInclude,
      }),
    ]);
  },
};
export default CollectionService;
