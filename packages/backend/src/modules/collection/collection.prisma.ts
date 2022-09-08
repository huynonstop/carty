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

export const collectionTextSearch = (key: string) => ({
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
      name: {
        search: key,
      },
    },
    {
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
    filter.push(collectionTextSearch(key));
  }
  return filter;
};

export const searchCollectionByKeyFilter = (key?: string) => {
  const filter: any[] = [
    {
      isPublic: true,
    },
  ];

  if (key) {
    filter.push(collectionTextSearch(key));
  }
  return filter;
};
