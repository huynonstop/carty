import { Router } from 'express';
import { collectionRoute } from '@/modules/collection/collection.route';
import { userRoute } from '@/modules/user/user.route';
import { authRoute } from '@/modules/auth/auth.route';
import { tagRoute } from '@/modules/tag/tag.route';

console.log('Loading router');
export const apiRouter = Router();
apiRouter.use('/tag', tagRoute);
apiRouter.use('/user', userRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/collection', collectionRoute);
export const statusRouter = Router();
statusRouter.use('/hello', (req, res) => {
  res.json({
    message: 'helloworld',
  });
});
