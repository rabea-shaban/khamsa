import { apiClient } from '../axios/client';
import { ApiResponse } from '@/types/api';

export interface BackupItem {
  filename: string;
  key: string;
  url: string;
  sizeBytes: number;
  timestamp: string;
  totalRecords?: number;
  counts?: Record<string, number>;
}

export const backupApi = {
  getBackups: async (): Promise<ApiResponse<BackupItem[]>> => {
    const res = await apiClient.get<ApiResponse<BackupItem[]>>('/admin/backups');
    return res.data;
  },

  triggerBackup: async (): Promise<ApiResponse<BackupItem>> => {
    const res = await apiClient.post<ApiResponse<BackupItem>>('/admin/backups');
    return res.data;
  },
};
