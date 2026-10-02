import { QueryFilter } from 'mongoose';
import { FeaturedLink } from './featured-link.model';
import { IFeaturedLinkDocument } from './featured-link.types';
import {
  CreateFeaturedLinkDto,
  UpdateFeaturedLinkDto,
  AdminFeaturedLinkQueryDto,
} from './featured-link.validation';
import { PaginatedResult } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';

export class FeaturedLinkService {
  /**
   * Public: Get all active featured links sorted by order ASC, then newest
   */
  static async getPublicFeaturedLinks(): Promise<IFeaturedLinkDocument[]> {
    const links = await FeaturedLink.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean()
      .exec();

    return links as unknown as IFeaturedLinkDocument[];
  }

  /**
   * Admin: Get all featured links with optional filtering and pagination
   */
  static async getAdminFeaturedLinks(
    query: AdminFeaturedLinkQueryDto,
  ): Promise<PaginatedResult<IFeaturedLinkDocument>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const filter: QueryFilter<IFeaturedLinkDocument> = {};

    if (query.isActive === 'true') {
      filter.isActive = true;
    } else if (query.isActive === 'false') {
      filter.isActive = false;
    }

    if (query.search) {
      const sanitized = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(sanitized, 'i');
      filter.$or = [{ title: regex }, { url: regex }];
    }

    let sortOrder: Record<string, 1 | -1> = { order: 1, createdAt: -1 };
    if (query.sort === 'latest') {
      sortOrder = { createdAt: -1 };
    } else if (query.sort === 'oldest') {
      sortOrder = { createdAt: 1 };
    }

    const [items, total] = await Promise.all([
      FeaturedLink.find(filter).sort(sortOrder).skip(skip).limit(limit).exec(),
      FeaturedLink.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  /**
   * Get a single featured link by ID
   */
  static async getFeaturedLinkById(id: string): Promise<IFeaturedLinkDocument> {
    const link = await FeaturedLink.findById(id).exec();
    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }
    return link;
  }

  /**
   * Create a new featured link
   */
  static async createFeaturedLink(
    data: CreateFeaturedLinkDto,
  ): Promise<IFeaturedLinkDocument> {
    const link = new FeaturedLink(data);
    await link.save();
    return link;
  }

  /**
   * Update an existing featured link
   */
  static async updateFeaturedLink(
    id: string,
    data: UpdateFeaturedLinkDto,
  ): Promise<IFeaturedLinkDocument> {
    const link = await FeaturedLink.findById(id).exec();
    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }

    Object.assign(link, data);
    await link.save();
    return link;
  }

  /**
   * Toggle the active status of a featured link
   */
  static async toggleActive(id: string): Promise<IFeaturedLinkDocument> {
    const link = await FeaturedLink.findById(id).exec();
    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }

    link.isActive = !link.isActive;
    await link.save();
    return link;
  }

  /**
   * Delete a featured link by ID
   */
  static async deleteFeaturedLink(id: string): Promise<void> {
    const link = await FeaturedLink.findById(id).exec();
    if (!link) {
      throw ApiError.notFound('الرابط المميز غير موجود');
    }

    await FeaturedLink.findByIdAndDelete(id).exec();
  }
}
