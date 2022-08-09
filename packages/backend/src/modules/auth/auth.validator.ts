import { upperLowerDigit } from '@/utils/customValidator';
import { RequestHandler } from 'express';
import { BadRequest } from '@/utils/customError';
import validator from 'validator';

export const emailPasswordBodyValidator: RequestHandler = (
  req,
  res,
  next,
) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new BadRequest('MUST_HAVE_EMAIL'));
  }
  if (!password) {
    return next(new BadRequest('MUST_HAVE_PASSWORD'));
  }
  if (!validator.isEmail(email)) {
    return next(new BadRequest('INVALID_EMAIL'));
  }
  if (!upperLowerDigit(password)) {
    return next(new BadRequest('INVALID_PASSWORD'));
  }
  next();
};
