import prismaClient from '@/lib/prisma';
const TagService = {
  async createTag(label: string) {
    return prismaClient.tag.create({
      data: {
        label,
      },
    });
  },
  async createTags(labels: string[]) {
    return prismaClient.tag.createMany({
      data: labels.map((label) => ({ label })),
      skipDuplicates: true,
    });
  },
  async getMostPopularTags({ take }: { take?: number }) {
    return prismaClient.tag.findMany({
      orderBy: {
        collections: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: {
            collections: true,
            // filteredRelationCount
            // collections: {
            //   where: {
            //     isPublic: true,
            //   },
            // },
          },
        },
      },
      take,
    });
  },
};
export default TagService;
