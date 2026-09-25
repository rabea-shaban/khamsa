import { Request, Response } from 'express';
import { BackupService } from './backup.service';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';

export class BackupController {
  static createBackup = asyncHandler(async (_req: Request, res: Response) => {
    const backup = await BackupService.createBackup();
    return ApiResponse.success(res, backup, 'Backup created and uploaded successfully');
  });

  static getBackups = asyncHandler(async (_req: Request, res: Response) => {
    const backups = await BackupService.listBackups();
    return ApiResponse.success(res, backups, 'Backups list retrieved successfully');
  });
}
