import { Request, Response } from 'express';
import { VideoService } from './video.service';
import {
  CreateVideoDto,
  UpdateVideoDto,
  PublicVideoQueryDto,
  AdminVideoQueryDto,
} from './video.validation';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';

export class VideoController {
  // Public handlers
  static getPublicVideos = asyncHandler(async (req: Request, res: Response) => {
    const result = await VideoService.getPublicVideos(
      req.query as unknown as PublicVideoQueryDto,
    );
    return ApiResponse.success(res, result, 'Public videos retrieved');
  });

  static getPublicVideoById = asyncHandler(async (req: Request, res: Response) => {
    const video = await VideoService.getPublicVideoById(req.params.id as string);
    return ApiResponse.success(res, video, 'Video details retrieved');
  });

  // Admin handlers
  static getAdminVideos = asyncHandler(async (req: Request, res: Response) => {
    const result = await VideoService.getAdminVideos(
      req.query as unknown as AdminVideoQueryDto,
    );
    return ApiResponse.success(res, result, 'Videos retrieved');
  });

  static getVideoById = asyncHandler(async (req: Request, res: Response) => {
    const video = await VideoService.getVideoById(req.params.id as string);
    return ApiResponse.success(res, video, 'Video details retrieved');
  });

  static createVideo = asyncHandler(async (req: Request, res: Response) => {
    const video = await VideoService.createVideo(
      req.body as CreateVideoDto,
      req.user!.userId,
    );
    return ApiResponse.created(res, video, 'Video created successfully');
  });

  static updateVideo = asyncHandler(async (req: Request, res: Response) => {
    const video = await VideoService.updateVideo(
      req.params.id as string,
      req.body as UpdateVideoDto,
    );
    return ApiResponse.success(res, video, 'Video updated successfully');
  });

  static publishVideo = asyncHandler(async (req: Request, res: Response) => {
    const video = await VideoService.publishVideo(req.params.id as string);
    return ApiResponse.success(res, video, 'Video published successfully');
  });

  static unpublishVideo = asyncHandler(async (req: Request, res: Response) => {
    const video = await VideoService.unpublishVideo(req.params.id as string);
    return ApiResponse.success(res, video, 'Video unpublished successfully');
  });

  static deleteVideo = asyncHandler(async (req: Request, res: Response) => {
    await VideoService.deleteVideo(req.params.id as string);
    return ApiResponse.success(res, null, 'Video deleted successfully');
  });
}
