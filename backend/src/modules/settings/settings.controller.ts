import { Request, Response } from 'express';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './settings.validation';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';

export class SettingsController {
  static getPublicSettings = asyncHandler(async (_req: Request, res: Response) => {
    const settings = await SettingsService.getSettings();
    return ApiResponse.success(res, settings, 'Public settings retrieved');
  });

  static getAdminSettings = asyncHandler(async (_req: Request, res: Response) => {
    const settings = await SettingsService.getSettings();
    return ApiResponse.success(res, settings, 'Admin settings retrieved');
  });

  static updateSettings = asyncHandler(async (req: Request, res: Response) => {
    const settings = await SettingsService.updateSettings(req.body as UpdateSettingsDto);
    return ApiResponse.success(res, settings, 'Settings updated successfully');
  });
}
