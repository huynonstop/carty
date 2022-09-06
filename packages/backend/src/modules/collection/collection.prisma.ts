import { orderByCreatedAt } from '@/lib/prisma';
import { selectUserField } from '@/modules/user/user.prisma';
import { buyerInclude } from './item/item.prisma';

export const collectionInclude: any = {
  owner: selectUserField,
  sharedUsers: {
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  },
  tags: true,
  items: {
    orderBy: orderByCreatedAt as any,
    include: buyerInclude as any,
  },
};

export const searchCollectionByKeyWithoutPublicFilter = (
  userId: string,
  key?: string,
) => {
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
  return filter;
};

export const searchCollectionByKeyFilter = (
  userId: string,
  key?: string,
) => {
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
  return filter;
};
