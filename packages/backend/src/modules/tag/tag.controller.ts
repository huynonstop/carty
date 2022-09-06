import { ModuleController } from '@/common/type';
import { asyncHandler } from '@/utils/asyncHandler';
import TagService from './tag.service';

type TagControllerHandler = 'getMostPopularTags';

const TagController: ModuleController<TagControllerHandler> = {
  getMostPopularTags: asyncHandler(async (req, res) => {
    const { take } = req.query as { take: string };
    const mostPopularTags = await TagService.getMostPopularTags({
      take: take ? parseInt(take) : 5,
    });
    return res.json({ mostPopularTags });
  }),
};
export default TagController;
