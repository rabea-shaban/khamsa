import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/common.types';
import { ApiError } from '../utils/api-error';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `User role '${req.user.role}' is not authorized to access this resource`,
        ),
      );
    }

    next();
  };
};
