import { Request, Response, CookieOptions } from 'express';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './auth.validation';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';
import { env } from '../../config/env.config';

const isProduction = env.NODE_ENV === 'production';

const getCookieOptions = (maxAgeMs: number): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: maxAgeMs,
  path: '/',
});

// Access token cookie maxAge: 15 mins (900,000 ms)
const ACCESS_TOKEN_COOKIE_OPTIONS = getCookieOptions(15 * 60 * 1000);
// Refresh token cookie maxAge: 7 days (7 * 24 * 60 * 60 * 1000 ms)
const REFRESH_TOKEN_COOKIE_OPTIONS = getCookieOptions(7 * 24 * 60 * 60 * 1000);

export class AuthController {
  static login = asyncHandler(async (req: Request, res: Response) => {
    const { user, tokens } = await AuthService.login(req.body as LoginRequestDto);

    res.cookie('accessToken', tokens.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    res.cookie('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return ApiResponse.success(
      res,
      {
        user,
        accessToken: tokens.accessToken,
      },
      'Logged in successfully',
    );
  });

  static logout = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });

    return ApiResponse.success(res, null, 'Logged out successfully');
  });

  static refresh = asyncHandler(async (req: Request, res: Response) => {
    const rawRefreshToken =
      (req.cookies && req.cookies.refreshToken) ||
      (req.body && req.body.refreshToken);

    const { user, tokens } = await AuthService.refreshToken(rawRefreshToken);

    res.cookie('accessToken', tokens.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    res.cookie('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return ApiResponse.success(
      res,
      {
        user,
        accessToken: tokens.accessToken,
      },
      'Token refreshed successfully',
    );
  });

  static getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = await AuthService.getMe(req.user!.userId);
    return ApiResponse.success(res, user, 'Current user profile');
  });
}
