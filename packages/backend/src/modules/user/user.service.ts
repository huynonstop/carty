import prismaClient from '@/lib/prisma';
const UserService = {
  getUserInfo(userId: string) {
    return prismaClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  },
  getUserByEmail(email: string) {
    return prismaClient.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  },
  setUserName(userId: string, name: string) {
    return prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });
  },
};
export default UserService;
