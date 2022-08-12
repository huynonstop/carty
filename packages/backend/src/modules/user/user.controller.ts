import { ModuleController } from '@/common/type';
import { asyncHandler } from '@/utils/asyncHandler';
import { BadRequest } from '@/utils/customError';
import UserService from './user.service';

const UserController: ModuleController = {
  getUserInfo: asyncHandler(async (req, res) => {
    const { tokenInfo } = res.locals;
    const userId: string = tokenInfo.userId;
    const user = await UserService.getUserInfo(userId);
    return res.json({
      userId: user.id,
      email: user.email,
      name: user.name,
    });
  }),
  getUserInfoById: asyncHandler(async (req, res) => {
    const { tokenInfo } = res.locals;
    const { userId } = req.params;
    const user = await UserService.getUserInfo(userId);
    const isOwner = tokenInfo.userId === userId;
    return res.json({
      userId: user.id,
      email: isOwner ? user.email : '',
      name: user.name,
      isOwner,
    });
  }),
  setUserName: asyncHandler(async (req, res) => {
    const { tokenInfo } = res.locals;
    const { name } = req.body;
    if (!name) {
      throw new BadRequest('NO_NAME');
    }
    const user = await UserService.setUserName(
      tokenInfo.userId,
      name,
    );
    return res.json({
      name: user.name,
    });
  }),
};
export default UserController;
