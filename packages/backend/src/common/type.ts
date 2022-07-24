import { RequestHandler } from 'express';
export interface ModuleController {
  [key: string]: RequestHandler;
}
