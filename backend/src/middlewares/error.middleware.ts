import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { ApiError, ErrorDetail } from '../utils/api-error';
import { env } from '../config/env.config';

export const errorHandler: ErrorRequestHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = 'Internal server error';
  let errors: ErrorDetail[] = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid format for '${err.path}': ${err.value}`;
    errors = [{ field: err.path, message: `Invalid value provided for ${err.path}` }];
  } else if ('code' in err && (err as { code: number }).code === 11000) {
    statusCode = 409;
    const mongoErr = err as { keyValue?: Record<string, unknown> };
    const fields = mongoErr.keyValue ? Object.keys(mongoErr.keyValue).join(', ') : 'field';
    message = `Duplicate value entered for ${fields}. It must be unique.`;
    errors = [{ field: fields, message: `A record with this ${fields} already exists.` }];
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token has expired';
  } else if (err.name === 'MulterError') {
    statusCode = 400;
    message = err.message;
  } else {
    // Unexpected internal error
    console.error('💥 Unexpected Server Error:', err);
    message = err.message || 'Internal server error';
  }

  const responsePayload = {
    success: false,
    message,
    ...(errors.length > 0 ? { errors } : {}),
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(responsePayload);
};
