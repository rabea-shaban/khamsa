import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import mongoose from 'mongoose';
import { ApiError, ErrorDetail } from '../utils/api-error';

interface RequestValidators {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export const validate = (validators: RequestValidators) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (validators.params) {
        const parsedParams = await validators.params.parseAsync(req.params ?? {});
        Object.defineProperty(req, 'params', {
          value: parsedParams,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      if (validators.query) {
        const parsedQuery = await validators.query.parseAsync(req.query ?? {});
        Object.defineProperty(req, 'query', {
          value: parsedQuery,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body ?? {});
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails: ErrorDetail[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        next(new ApiError(400, 'Validation failed', errorDetails));
      } else {
        next(error);
      }
    }
  };
};

export const validateMongoId = (paramName = 'id') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (typeof id === 'string' && !mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest(`Invalid ID format for parameter '${paramName}'`));
    }
    next();
  };
};
