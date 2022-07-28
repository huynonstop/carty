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
};
export default TagService;
