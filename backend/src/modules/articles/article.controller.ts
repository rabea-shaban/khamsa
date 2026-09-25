import { Request, Response } from 'express';
import { ArticleService } from './article.service';
import {
  CreateArticleDto,
  UpdateArticleDto,
  PublicArticleQueryDto,
  AdminArticleQueryDto,
} from './article.validation';
import { ApiResponse } from '../../utils/api-response';
import { asyncHandler } from '../../utils/async-handler';

export class ArticleController {
  // Public handlers
  static getPublicArticles = asyncHandler(async (req: Request, res: Response) => {
    const result = await ArticleService.getPublicArticles(
      req.query as unknown as PublicArticleQueryDto,
    );
    return ApiResponse.success(res, result, 'Public articles retrieved');
  });

  static getPublicArticleBySlug = asyncHandler(async (req: Request, res: Response) => {
    const article = await ArticleService.getPublicArticleBySlug(req.params.slug as string);
    return ApiResponse.success(res, article, 'Article details retrieved');
  });

  // Admin handlers
  static getAdminArticles = asyncHandler(async (req: Request, res: Response) => {
    const result = await ArticleService.getAdminArticles(
      req.query as unknown as AdminArticleQueryDto,
    );
    return ApiResponse.success(res, result, 'Articles retrieved');
  });

  static getArticleById = asyncHandler(async (req: Request, res: Response) => {
    const article = await ArticleService.getArticleById(req.params.id as string);
    return ApiResponse.success(res, article, 'Article details retrieved');
  });

  static createArticle = asyncHandler(async (req: Request, res: Response) => {
    const article = await ArticleService.createArticle(
      req.body as CreateArticleDto,
      req.user!.userId,
    );
    return ApiResponse.created(res, article, 'Article created successfully');
  });

  static updateArticle = asyncHandler(async (req: Request, res: Response) => {
    const article = await ArticleService.updateArticle(
      req.params.id as string,
      req.body as UpdateArticleDto,
    );
    return ApiResponse.success(res, article, 'Article updated successfully');
  });

  static publishArticle = asyncHandler(async (req: Request, res: Response) => {
    const article = await ArticleService.publishArticle(req.params.id as string);
    return ApiResponse.success(res, article, 'Article published successfully');
  });

  static unpublishArticle = asyncHandler(async (req: Request, res: Response) => {
    const article = await ArticleService.unpublishArticle(req.params.id as string);
    return ApiResponse.success(res, article, 'Article unpublished successfully');
  });

  static deleteArticle = asyncHandler(async (req: Request, res: Response) => {
    await ArticleService.deleteArticle(req.params.id as string);
    return ApiResponse.success(res, null, 'Article deleted successfully');
  });
}
