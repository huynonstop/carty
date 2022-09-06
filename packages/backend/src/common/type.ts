import { RequestHandler } from 'express';
export type ModuleController<T extends string = any> = Record<
  T,
  RequestHandler
>;
