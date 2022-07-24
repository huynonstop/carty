import prismaClient from '@/lib/prisma';
import { CreateUserDTO } from './user.dto';
const UserService = {
  async getUserInfo(userId: string) {
    return prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};
export default UserService;
