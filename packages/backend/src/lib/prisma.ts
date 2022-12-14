import { ErrorRequestHandler } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prismaClient = new PrismaClient();
export const prismaErrorFilter: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: err.code,
        message: 'RESOURCE_CONFLICT',
      });
    }

    return res.status(500).json({
      error: err.code,
      message: err.message,
    });
  }
  next(err);
};
export const orderByCreatedAt = {
  createdAt: 'desc',
};
export default prismaClient;
