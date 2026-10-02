import { Request, Response } from 'express';
import { FeaturedLinkService } from './featured-link.service';
import {
  CreateFeaturedLinkDto,
  UpdateFeaturedLinkDto,
  AdminFeaturedLinkQueryDto,
} from './featured-link.validation';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';

export class FeaturedLinkController {
  // Public handler
  static getPublicFeaturedLinks = asyncHandler(async (_req: Request, res: Response) => {
    const links = await FeaturedLinkService.getPublicFeaturedLinks();
    return ApiResponse.success(res, links, 'تم جلب الروابط المميزة بنجاح');
  });

  // Admin handlers
  static getAdminFeaturedLinks = asyncHandler(async (req: Request, res: Response) => {
    const result = await FeaturedLinkService.getAdminFeaturedLinks(
      req.query as unknown as AdminFeaturedLinkQueryDto,
    );
    return ApiResponse.success(res, result, 'تم جلب الروابط المميزة بنجاح');
  });

  static getFeaturedLinkById = asyncHandler(async (req: Request, res: Response) => {
    const link = await FeaturedLinkService.getFeaturedLinkById(req.params.id as string);
    return ApiResponse.success(res, link, 'تم جلب تفاصيل الرابط المميز');
  });

  static createFeaturedLink = asyncHandler(async (req: Request, res: Response) => {
    const link = await FeaturedLinkService.createFeaturedLink(
      req.body as CreateFeaturedLinkDto,
    );
    return ApiResponse.created(res, link, 'تم إضافة الرابط بنجاح');
  });

  static updateFeaturedLink = asyncHandler(async (req: Request, res: Response) => {
    const link = await FeaturedLinkService.updateFeaturedLink(
      req.params.id as string,
      req.body as UpdateFeaturedLinkDto,
    );
    return ApiResponse.success(res, link, 'تم تحديث الرابط بنجاح');
  });

  static toggleActive = asyncHandler(async (req: Request, res: Response) => {
    const link = await FeaturedLinkService.toggleActive(req.params.id as string);
    const message = link.isActive ? 'تم تفعيل الرابط' : 'تم تعطيل الرابط';
    return ApiResponse.success(res, link, message);
  });

  static deleteFeaturedLink = asyncHandler(async (req: Request, res: Response) => {
    await FeaturedLinkService.deleteFeaturedLink(req.params.id as string);
    return ApiResponse.success(res, null, 'تم حذف الرابط بنجاح');
  });
}
