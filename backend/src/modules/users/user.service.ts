import { QueryFilter } from 'mongoose';
import { User } from './user.model';
import { IUserDocument } from './user.types';
import { CreateUserDto, UpdateUserDto, ListUsersQueryDto } from './user.validation';
import { PaginatedResult, UserRole } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';

export class UserService {
  static async getUserStats(): Promise<{
    total: number;
    admins: number;
    editors: number;
    active: number;
    inactive: number;
  }> {
    const [total, admins, editors, active, inactive] = await Promise.all([
      User.countDocuments().exec(),
      User.countDocuments({ role: UserRole.ADMIN }).exec(),
      User.countDocuments({ role: UserRole.EDITOR }).exec(),
      User.countDocuments({ isActive: true }).exec(),
      User.countDocuments({ isActive: false }).exec(),
    ]);

    return { total, admins, editors, active, inactive };
  }

  static async createUser(data: CreateUserDto): Promise<IUserDocument> {
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw ApiError.conflict('A user with this email address already exists');
    }

    const user = new User(data);
    await user.save();
    return user;
  }

  static async getUsers(query: ListUsersQueryDto): Promise<PaginatedResult<IUserDocument>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const filter: QueryFilter<IUserDocument> = {};

    if (query.role) {
      filter.role = query.role;
    }

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    if (query.sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (query.sort === 'name_asc') {
      sortOption = { name: 1 };
    } else if (query.sort === 'name_desc') {
      sortOption = { name: -1 };
    }

    const [items, total] = await Promise.all([
      User.find(filter).sort(sortOption).skip(skip).limit(limit).exec(),
      User.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async getUserById(id: string): Promise<IUserDocument> {
    const user = await User.findById(id).exec();
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }

  static async updateUser(
    id: string,
    data: UpdateUserDto,
    currentUserId?: string,
  ): Promise<IUserDocument> {
    const user = await User.findById(id).exec();
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Check email uniqueness if changing email
    if (data.email && data.email !== user.email) {
      const existing = await User.findOne({ email: data.email, _id: { $ne: id } });
      if (existing) {
        throw ApiError.conflict('A user with this email address already exists');
      }
    }

    // Prevent demoting or deactivating the last active ADMIN
    if (
      user.role === UserRole.ADMIN &&
      ((data.role && data.role !== UserRole.ADMIN) || data.isActive === false)
    ) {
      const activeAdminCount = await User.countDocuments({
        role: UserRole.ADMIN,
        isActive: true,
      });

      if (activeAdminCount <= 1) {
        throw ApiError.badRequest('Cannot demote or deactivate the last active administrator');
      }
    }

    // Prevent demoting or deactivating yourself
    if (currentUserId && currentUserId === id) {
      if (data.role && data.role !== UserRole.ADMIN) {
        throw ApiError.badRequest('Cannot demote your own administrator privileges');
      }
      if (data.isActive === false) {
        throw ApiError.badRequest('Cannot deactivate your own administrator account');
      }
    }

    Object.assign(user, data);
    await user.save();
    return user;
  }

  static async changePassword(id: string, newPassword: string): Promise<IUserDocument> {
    const user = await User.findById(id).exec();
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    user.password = newPassword;
    await user.save();
    return user;
  }

  static async toggleStatus(id: string, currentUserId?: string): Promise<IUserDocument> {
    const user = await User.findById(id).exec();
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const nextStatus = !user.isActive;

    if (user.role === UserRole.ADMIN && !nextStatus) {
      const activeAdminCount = await User.countDocuments({
        role: UserRole.ADMIN,
        isActive: true,
      });

      if (activeAdminCount <= 1) {
        throw ApiError.badRequest('Cannot deactivate the last active administrator');
      }
    }

    if (currentUserId && currentUserId === id && !nextStatus) {
      throw ApiError.badRequest('Cannot deactivate your own administrator account');
    }

    user.isActive = nextStatus;
    await user.save();
    return user;
  }

  static async deleteUser(id: string, currentUserId?: string): Promise<void> {
    const user = await User.findById(id).exec();
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Prevent deleting the last ADMIN
    if (user.role === UserRole.ADMIN) {
      const adminCount = await User.countDocuments({
        role: UserRole.ADMIN,
      });

      if (adminCount <= 1) {
        throw ApiError.badRequest('Cannot delete the last administrator account');
      }
    }

    // Prevent deleting own account
    if (currentUserId && currentUserId === id) {
      throw ApiError.badRequest('Cannot delete your own administrator account');
    }

    await User.findByIdAndDelete(id).exec();
  }
}
