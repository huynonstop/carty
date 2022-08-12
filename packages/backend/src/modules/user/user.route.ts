import {
  tokenGuard,
  validTokenGuard,
} from '@/modules/auth/auth.guard';
import { Router } from 'express';
import UserController from './user.controller';

export const userRoute = Router();
userRoute.get(
  '/',
  tokenGuard,
  validTokenGuard,
  UserController.getUserInfo,
);
userRoute.patch(
  '/',
  tokenGuard,
  validTokenGuard,
  UserController.setUserName,
);
userRoute.get(
  '/:userId',
  tokenGuard,
  validTokenGuard,
  UserController.getUserInfoById,
);
