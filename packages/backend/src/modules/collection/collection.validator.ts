import { BadRequest } from '@/utils/customError';
import { RequestHandler } from 'express';
import validator from 'validator';
export const createCollectionBodyValidator: RequestHandler = (
  req,
  res,
  next,
) => {
  const { name } = req.body;
  if (!name) {
    return next(new BadRequest('MUST_HAVE_NAME'));
  }
  next();
};

export const updateCollectionNameValidator: RequestHandler = (
  req,
  res,
  next,
) => {
  const { name } = req.body;
  if (!name) {
    return next(new BadRequest('MUST_HAVE_NAME'));
  }
  req.body = { name };
  next();
};

export const updateCollectionDescriptionValidator: RequestHandler = (
  req,
  res,
  next,
) => {
  const { description } = req.body;
  req.body = { description };
  next();
};

export const updateCollectionPublicValidator: RequestHandler = (
  req,
  res,
  next,
) => {
  const { isPublic } = req.body;

  if (isPublic !== true && isPublic !== false) {
    return next(new BadRequest('MUST_BE_BOOLEAN'));
  }
  req.body = { isPublic };
  next();
};

export const updateCollectionTagsValidator: RequestHandler = (
  req,
  res,
  next,
) => {
  const { tags } = req.body;
  if (!tags || !Array.isArray(tags)) {
    return next(new BadRequest('MUST_BE_ARRAY'));
  }
  req.body = { tags };
  next();
};
