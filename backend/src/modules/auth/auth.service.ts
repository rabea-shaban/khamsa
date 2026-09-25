import { User } from '../users/user.model';
import { IUserDocument } from '../users/user.types';
import { LoginDto, AuthTokens } from './auth.types';
import { ApiError } from '../../utils/api-error';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.util';
import { JwtPayload } from '../../types/common.types';

export class AuthService {
  static async login(
    dto: LoginDto,
  ): Promise<{ user: IUserDocument; tokens: AuthTokens }> {
    const user = await User.findOne({ email: dto.email }).select('+password').exec();

    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Your account has been deactivated. Please contact an administrator.');
    }

    const isMatch = await user.comparePassword(dto.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Update lastLoginAt
    await User.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } }).exec();

    const jwtPayload: JwtPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = signAccessToken(jwtPayload);
    const refreshToken = signRefreshToken(jwtPayload);

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  static async refreshToken(
    rawRefreshToken: string,
  ): Promise<{ user: IUserDocument; tokens: AuthTokens }> {
    if (!rawRefreshToken) {
      throw ApiError.unauthorized('Refresh token is required');
    }

    const payload = verifyRefreshToken(rawRefreshToken);
    const user = await User.findById(payload.userId).exec();

    if (!user) {
      throw ApiError.unauthorized('User not found');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Account is deactivated');
    }

    const newPayload: JwtPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = signAccessToken(newPayload);
    const refreshToken = signRefreshToken(newPayload);

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  static async getMe(userId: string): Promise<IUserDocument> {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }
}
