import { selectUserField } from '@/modules/user/user.prisma';
import { orderByCreatedAt } from '@/lib/prisma';

export const buyerInclude = {
  buyer: selectUserField as any,
};

export const collectionItemsInclude = {
  collection: {
    select: {
      items: {
        orderBy: orderByCreatedAt as any,
        include: buyerInclude as any,
      },
    },
  },
};

export const deleteItemsInclude = (itemId: string) => ({
  collection: {
    select: {
      items: {
        where: {
          NOT: {
            id: itemId,
          },
        },
        orderBy: orderByCreatedAt as any,
        include: buyerInclude as any,
      },
    },
  },
});
