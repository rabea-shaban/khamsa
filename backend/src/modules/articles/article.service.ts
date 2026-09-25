import { QueryFilter } from 'mongoose';
import { Article } from './article.model';
import { IArticleDocument } from './article.types';
import {
  CreateArticleDto,
  UpdateArticleDto,
  PublicArticleQueryDto,
  AdminArticleQueryDto,
} from './article.validation';
import { ContentStatus, PaginatedResult } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';
import { getUniqueSlug } from '../../utils/slug.util';

export class ArticleService {
  static async createArticle(
    data: CreateArticleDto,
    authorId: string,
  ): Promise<IArticleDocument> {
    const slug = await getUniqueSlug(Article, data.title, data.slug);

    const publishedAt =
      data.status === ContentStatus.PUBLISHED ? new Date() : null;

    const article = new Article({
      ...data,
      slug,
      author: authorId,
      publishedAt,
    });
    await article.save();

    return (await article.populate('author', 'name avatar email')) as IArticleDocument;
  }

  static async getPublicArticles(
    query: PublicArticleQueryDto,
  ): Promise<PaginatedResult<IArticleDocument>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const filter: QueryFilter<IArticleDocument> = {
      status: ContentStatus.PUBLISHED,
    };

    if (query.category) {
      filter.category = query.category;
    }

    if (query.tag) {
      filter.tags = query.tag;
    }

    if (query.featured !== undefined) {
      filter.isFeatured = query.featured;
    }

    if (query.search) {
      const sanitized = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(sanitized, 'i');
      filter.$or = [{ title: regex }, { excerpt: regex }, { tags: regex }];
    }

    const sortOrder: Record<string, 1 | -1> =
      query.sort === 'oldest' ? { publishedAt: 1 } : { publishedAt: -1 };

    const [items, total] = await Promise.all([
      Article.find(filter)
        .populate('author', 'name avatar')
        .sort(sortOrder)
        .skip(skip)
        .limit(limit)
        .exec(),
      Article.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async getPublicArticleBySlug(slug: string): Promise<IArticleDocument> {
    const article = await Article.findOne({
      slug: slug.toLowerCase(),
      status: ContentStatus.PUBLISHED,
    })
      .populate('author', 'name avatar')
      .exec();

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    return article;
  }

  static async getAdminArticles(
    query: AdminArticleQueryDto,
  ): Promise<PaginatedResult<IArticleDocument>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const filter: QueryFilter<IArticleDocument> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.tag) {
      filter.tags = query.tag;
    }

    if (query.featured !== undefined) {
      filter.isFeatured = query.featured;
    }

    if (query.search) {
      const sanitized = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(sanitized, 'i');
      filter.$or = [{ title: regex }, { excerpt: regex }, { tags: regex }];
    }

    const sortOrder: Record<string, 1 | -1> =
      query.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const [items, total] = await Promise.all([
      Article.find(filter)
        .populate('author', 'name email avatar')
        .sort(sortOrder)
        .skip(skip)
        .limit(limit)
        .exec(),
      Article.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async getArticleById(id: string): Promise<IArticleDocument> {
    const article = await Article.findById(id)
      .populate('author', 'name email avatar')
      .exec();

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    return article;
  }

  static async updateArticle(
    id: string,
    data: UpdateArticleDto,
  ): Promise<IArticleDocument> {
    const article = await Article.findById(id).exec();
    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    if (data.title || data.slug) {
      const targetTitle = data.title || article.title;
      article.slug = await getUniqueSlug(
        Article,
        targetTitle,
        data.slug,
        id,
      );
    }

    if (
      data.status === ContentStatus.PUBLISHED &&
      article.status !== ContentStatus.PUBLISHED &&
      !article.publishedAt
    ) {
      article.publishedAt = new Date();
    }

    Object.assign(article, data);
    await article.save();

    return (await article.populate('author', 'name email avatar')) as IArticleDocument;
  }

  static async publishArticle(id: string): Promise<IArticleDocument> {
    const article = await Article.findById(id).exec();
    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    article.status = ContentStatus.PUBLISHED;
    if (!article.publishedAt) {
      article.publishedAt = new Date();
    }

    await article.save();
    return (await article.populate('author', 'name email avatar')) as IArticleDocument;
  }

  static async unpublishArticle(id: string): Promise<IArticleDocument> {
    const article = await Article.findById(id).exec();
    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    article.status = ContentStatus.DRAFT;
    await article.save();
    return (await article.populate('author', 'name email avatar')) as IArticleDocument;
  }

  static async deleteArticle(id: string): Promise<void> {
    const article = await Article.findById(id).exec();
    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    await Article.findByIdAndDelete(id).exec();
  }
}
