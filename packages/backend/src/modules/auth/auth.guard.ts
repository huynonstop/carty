import { SocketMiddleWare } from './../../lib/socket';
import { asyncHandler } from '@/utils/asyncHandler';
import { verifyToken, decodeToken } from '@/lib/jwt';
import { Unauthorized } from '@/utils/customError';
import { RequestHandler } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import io from '@/lib/socket';

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

export const socketTokenGuard: SocketMiddleWare = (socket, next) => {
  const { token } = socket.handshake.auth;
  if (!token) {
    return next(new Unauthorized('NO_SOCKET_AUTH_TOKEN'));
  }
  socket.locals.token = token;
  return next();
};

export const validSocketTokenGuard: SocketMiddleWare = async (
  socket,
  next,
) => {
  const { token } = socket.locals;
  try {
    const tokenInfo = await verifyToken(token);
    socket.locals.tokenInfo = tokenInfo;
    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next(new Unauthorized('TokenExpiredError'));
    }
    return next(new Unauthorized('INVALID_TOKEN'));
  }
};
