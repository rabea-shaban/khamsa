import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(ApiError.notFound(`Cannot find ${req.method} ${req.originalUrl} on this server`));
};
