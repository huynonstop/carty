import { BadRequest } from '@/utils/customError';
import { RequestHandler } from 'express';

export const createItemValidator: RequestHandler = (
  req,
  res,
  next,
) => {
  const { quantity } = req.body;
  if (quantity === 0) {
    return next(new BadRequest('QUANTITY_ZERO'));
  }
  next();
};

export const editItemValidator: RequestHandler = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === 0) {
    return next(new BadRequest('QUANTITY_ZERO'));
  }
  next();
};

export const parseItemPrice: RequestHandler = (req, res, next) => {
  const { price } = req.body;
  try {
    if (price !== undefined) req.body.price = parseFloat(price);
    next();
  } catch (err) {
    return next(new BadRequest('CANNOT_PARSE_PRICE'));
  }
};

export const parseQuantityPrice: RequestHandler = (
  req,
  res,
  next,
) => {
  const { quantity } = req.body;
  try {
    if (quantity !== undefined)
      req.body.quantity = parseInt(quantity);
    next();
  } catch (err) {
    return next(new BadRequest('CANNOT_PARSE_QUANTITY'));
  }
};
