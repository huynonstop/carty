import { ModuleController } from '@/common/type';
import { asyncHandler } from '@/utils/asyncHandler';
import UserService from '@/modules/user/user.service';
import { BadRequest } from '@/utils/customError';
import ShareService from './share.service';
import { useIO } from '@/lib/socket';

type ShareControllerHandler =
  | 'shareCollection'
  | 'getSharedUsers'
  | 'unshareCollection';

const ShareController: ModuleController<ShareControllerHandler> = {
  getSharedUsers: asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const collectionUser = await ShareService.getSharedUsers({
      collectionId,
    });
    return res.json({ collectionUser });
  }),
  shareCollection: asyncHandler(async (req, res) => {
    const { userId } = res.locals.tokenInfo;
    const { collectionId } = req.params;
    const { email } = req.body as { email: string };
    const sharedUser = await UserService.getUserByEmail(email);
    if (sharedUser.id === userId) {
      throw new BadRequest('NO_SHARE_OWNER');
    }
    const collectionUser = await ShareService.shareCollection({
      collectionId,
      userId: sharedUser.id,
    });
    return res.json({ collectionUser });
  }),
  unshareCollection: asyncHandler(async (req, res) => {
    const { shareId } = req.params;
    const collectionUser = await ShareService.unshareCollection({
      shareId,
    });
    useIO((io) => {
      io.to(collectionUser.collectionId).emit(
        'collection:share:update',
      );
    });
    return res.json({ collectionUser });
  }),
};
export default ShareController;
