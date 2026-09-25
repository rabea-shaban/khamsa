import { Request, Response } from 'express';
import { MediaService } from './media.service';
import { ListMediaQueryDto, PresignedUrlDto } from './media.validation';
import { ApiResponse } from '../../utils/api-response';
import { ApiError } from '../../utils/api-error';
import { asyncHandler } from '../../utils/async-handler';

export class MediaController {
  static uploadMedia = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw ApiError.badRequest('No image file provided in request');
    }

    const folder = (req.body.folder as string) || 'general';
    const media = await MediaService.uploadFile(
      req.file,
      folder,
      req.user!.userId,
    );

    return ApiResponse.created(res, media, 'Image uploaded successfully');
  });

  static getPresignedUploadUrl = asyncHandler(async (req: Request, res: Response) => {
    const result = await MediaService.generatePresignedUploadUrl(
      req.body as PresignedUrlDto,
      req.user!.userId,
    );

    return ApiResponse.success(
      res,
      result,
      'Presigned upload URL generated successfully',
    );
  });

  static getMediaList = asyncHandler(async (req: Request, res: Response) => {
    const result = await MediaService.getMediaList(
      req.query as unknown as ListMediaQueryDto,
    );
    return ApiResponse.success(res, result, 'Media items retrieved');
  });

  static deleteMedia = asyncHandler(async (req: Request, res: Response) => {
    await MediaService.deleteMedia(req.params.id as string);
    return ApiResponse.success(res, null, 'Media deleted successfully');
  });
}
