import { RequestHandler } from 'express';
export const waitMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.path, Date.now());
  setTimeout(() => next(), 3000);
};
export const routeParamsMiddleware: RequestHandler = (
  req,
  res,
  next,
) => {
  res.locals.route = {};
  res.locals.route.params = req.params;
  next();
};
