import { Router } from 'express';
import { tokenGuard, validTokenGuard } from '../auth/auth.guard';
import TagController from './tag.controller';

export const tagRoute = Router();
tagRoute
  .route('/')
  .get(tokenGuard, validTokenGuard, TagController.getMostPopularTags);
