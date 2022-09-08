import { prismaErrorFilter } from './lib/prisma';
import express, { ErrorRequestHandler } from 'express';
import { customErrorFilter, NotFound } from '@/utils/customError';
import { apiRouter, statusRouter } from '@/router';
import cors, { corsOptions } from '@/lib/cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// app.use(waitMiddleware);

app.use('/status', statusRouter);
app.use('/api', apiRouter);
app.use('*', (req, res, next) => {
  next(new NotFound('Not Found Route'));
});
const defaultErrorFilter: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  res.status(+err.statusCode || +err.status || 500);
  if (err.name) {
    return res.json({
      message: err.message,
      error: err.name,
    });
  }
  return res.json({
    message: 'Internal server error',
    error: err.message,
  });
};
app.use(prismaErrorFilter, customErrorFilter, defaultErrorFilter);

export default app;
