import { Document, Types } from 'mongoose';
import { UserRole } from '../../types/common.types';

export interface UserSocials {
  github?: string;
  linkedin?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  website?: string;
  whatsapp?: string;
  mostaql?: string;
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  bio?: string | null;
  socials?: UserSocials;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  bio?: string | null;
  socials?: UserSocials;
  isActive?: boolean;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  avatar?: string;
  bio?: string | null;
  socials?: UserSocials;
  isActive?: boolean;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string | null;
  socials?: UserSocials;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
