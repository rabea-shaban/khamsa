import { Response } from 'express';

export interface ApiResponseData<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200,
  ): Response {
    const responseBody: ApiResponseData<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(responseBody);
  }

  static created<T>(
    res: Response,
    data: T,
    message = 'Created successfully',
  ): Response {
    return ApiResponse.success(res, data, message, 201);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static error(
    res: Response,
    message = 'An error occurred',
    statusCode = 500,
    errors: unknown[] = [],
  ): Response {
    const responseBody: ApiResponseData = {
      success: false,
      message,
      errors,
    };
    return res.status(statusCode).json(responseBody);
  }
}
