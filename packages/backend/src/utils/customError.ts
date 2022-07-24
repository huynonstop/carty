import { ErrorRequestHandler } from 'express';

export enum CustomErrorName {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
}

export enum CustomErrorCode {
  BadRequest = 400,
  NotFound = 404,
  Forbidden = 403,
  Unauthorized = 401,
}

interface CustomError {
  statusCode: number;
  name: string;
  message: string;
}

export class BadRequest extends Error implements CustomError {
  statusCode: number = CustomErrorCode.BadRequest;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.BadRequest;
  }
}

export class NotFound extends Error implements CustomError {
  statusCode: number = CustomErrorCode.NotFound;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.NotFound;
  }
}

export class Forbidden extends Error implements CustomError {
  statusCode: number = CustomErrorCode.Forbidden;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.Forbidden;
  }
}

export class Unauthorized extends Error implements CustomError {
  statusCode: number = CustomErrorCode.Unauthorized;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.Unauthorized;
  }
}

export const customErrorFilter: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
  next,
) => {
  if (
    // ES2016
    err instanceof BadRequest ||
    err instanceof NotFound ||
    err instanceof Forbidden ||
    err instanceof Unauthorized
    // ES2015
    // err.name === CustomErrorName.BadRequest ||
    // err.name === CustomErrorName.NotFound ||
    // err.name === CustomErrorName.Forbidden ||
    // err.name === CustomErrorName.Unauthorized
  ) {
    const { message, name, statusCode } = err;
    return res.status(statusCode).json({
      error: name,
      message: message || name,
    });
  }
  next(err);
};
