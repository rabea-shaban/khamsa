import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ListUsersQueryDto, ChangeUserPasswordDto } from './user.validation';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';

export class UserController {
  static getUserStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await UserService.getUserStats();
    return ApiResponse.success(res, stats, 'User statistics retrieved successfully');
  });

  static createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body as CreateUserDto);
    return ApiResponse.created(res, user, 'User created successfully');
  });

  static getUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await UserService.getUsers(req.query as unknown as ListUsersQueryDto);
    return ApiResponse.success(res, result, 'Users retrieved successfully');
  });

  static getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id as string);
    return ApiResponse.success(res, user, 'User retrieved successfully');
  });

  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.updateUser(
      req.params.id as string,
      req.body as UpdateUserDto,
      req.user?.userId,
    );
    return ApiResponse.success(res, user, 'User updated successfully');
  });

  static changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { password } = req.body as ChangeUserPasswordDto;
    const user = await UserService.changePassword(req.params.id as string, password);
    return ApiResponse.success(res, user, 'User password changed successfully');
  });

  static toggleStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.toggleStatus(req.params.id as string, req.user?.userId);
    return ApiResponse.success(res, user, 'User status toggled successfully');
  });

  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await UserService.deleteUser(req.params.id as string, req.user?.userId);
    return ApiResponse.success(res, null, 'User deleted successfully');
  });
}
