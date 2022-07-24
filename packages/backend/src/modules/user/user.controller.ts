import { ModuleController } from '@/common/type';
import { asyncHandler } from '@/utils/asyncHandler';
import UserService from './user.service';

const UserController: ModuleController = {
  getUserInfo: asyncHandler(async (req, res, next) => {
    const { tokenInfo } = res.locals;
    const userId: string = tokenInfo.userId;
    const user = await UserService.getUserInfo(userId);
    return res.json(
      user
        ? {
            userId: user.id,
            email: user.email,
            name: user.name,
          }
        : {},
    );
  }),
};
export default UserController;
