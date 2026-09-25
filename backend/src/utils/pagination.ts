import { PaginatedResult } from '../types/common.types';

export interface PaginationParams {
  page?: number | string;
  limit?: number | string;
  maxLimit?: number;
}

export const getPaginationOptions = (
  params: PaginationParams,
): { page: number; limit: number; skip: number } => {
  const parsedPage = typeof params.page === 'string' ? parseInt(params.page, 10) : params.page || 1;
  const parsedLimit = typeof params.limit === 'string' ? parseInt(params.limit, 10) : params.limit || 10;
  const maxLimit = params.maxLimit || 100;

  const page = Math.max(1, isNaN(parsedPage) ? 1 : parsedPage);
  const limit = Math.min(maxLimit, Math.max(1, isNaN(parsedLimit) ? 10 : parsedLimit));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const createPaginatedResult = <T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> => {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
