import { asyncHandler } from '@/utils/asyncHandler';
import { verifyToken, decodeToken } from '@/lib/jwt';
import { Unauthorized } from '@/utils/customError';
import { RequestHandler } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

export const tokenGuard: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new Unauthorized('NO_BEARER_TOKEN'));
  }
  const accessToken = authHeader.split(' ')[1];
  res.locals.accessToken = accessToken;
  return next();
};

export const validTokenGuard: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const accessToken = res.locals.accessToken;
    try {
      const tokenInfo = await verifyToken(accessToken);
      res.locals.tokenInfo = tokenInfo;
      return next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return next(new Unauthorized('TokenExpiredError'));
      }
      return next(new Unauthorized('INVALID_TOKEN'));
    }
  },
);

export const expiredValidTokenGuard: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const accessToken = res.locals.accessToken;
    try {
      const tokenInfo = await verifyToken(accessToken);
      res.locals.tokenInfo = tokenInfo;
      return next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        const tokenInfo = decodeToken(accessToken);
        res.locals.tokenInfo = tokenInfo;
        return next();
      }
      return next(new Unauthorized('INVALID_TOKEN'));
    }
  },
);
