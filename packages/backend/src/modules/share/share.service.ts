import prismaClient from '@/lib/prisma';
import { selectUserField } from '../user/user.prisma';

const ShareService = {
  async shareCollection({ collectionId, userId }: any) {
    return prismaClient.collectionUser.create({
      data: {
        userId,
        collectionId,
      },
      include: {
        collection: {
          include: {
            sharedUsers: {
              include: {
                user: selectUserField,
              },
            },
          },
        },
      },
    });
  },
  async unshareCollection({ shareId }: { shareId: string }) {
    return prismaClient.collectionUser.delete({
      where: {
        id: shareId,
      },
    });
  },
  async getSharedUsers({ collectionId }: { collectionId: string }) {
    return prismaClient.collectionUser.findMany({
      where: {
        collectionId,
      },
      include: {
        user: selectUserField,
      },
    });
  },
};
export default ShareService;
