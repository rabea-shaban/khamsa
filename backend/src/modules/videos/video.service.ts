import { QueryFilter } from 'mongoose';
import { Video } from './video.model';
import '../users/user.model';
import { IVideoDocument } from './video.types';
import {
  CreateVideoDto,
  UpdateVideoDto,
  PublicVideoQueryDto,
  AdminVideoQueryDto,
} from './video.validation';
import { ContentStatus, PaginatedResult } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';

export class VideoService {
  static async createVideo(
    data: CreateVideoDto,
    authorId: string,
  ): Promise<IVideoDocument> {
    const publishedAt =
      data.status === ContentStatus.PUBLISHED ? new Date() : null;

    const video = new Video({
      ...data,
      author: authorId,
      publishedAt,
    });
    await video.save();

    return (await video.populate('author', 'name avatar email')) as IVideoDocument;
  }

  static async getPublicVideos(
    query: PublicVideoQueryDto,
  ): Promise<PaginatedResult<IVideoDocument>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const filter: QueryFilter<IVideoDocument> = {
      status: ContentStatus.PUBLISHED,
    };

    if (query.platform) {
      filter.platform = query.platform;
    }

    if (query.search) {
      const sanitized = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(sanitized, 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const sortOrder: Record<string, 1 | -1> =
      query.sort === 'oldest' ? { publishedAt: 1 } : { publishedAt: -1 };

    const [items, total] = await Promise.all([
      Video.find(filter)
        .populate('author', 'name avatar')
        .sort(sortOrder)
        .skip(skip)
        .limit(limit)
        .exec(),
      Video.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async getPublicVideoById(id: string): Promise<IVideoDocument> {
    const video = await Video.findOne({
      _id: id,
      status: ContentStatus.PUBLISHED,
    })
      .populate('author', 'name avatar')
      .exec();

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    return video;
  }

  static async getAdminVideos(
    query: AdminVideoQueryDto,
  ): Promise<PaginatedResult<IVideoDocument>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const filter: QueryFilter<IVideoDocument> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.platform) {
      filter.platform = query.platform;
    }

    if (query.search) {
      const sanitized = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(sanitized, 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const sortOrder: Record<string, 1 | -1> =
      query.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const [items, total] = await Promise.all([
      Video.find(filter)
        .populate('author', 'name email avatar')
        .sort(sortOrder)
        .skip(skip)
        .limit(limit)
        .exec(),
      Video.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async getVideoById(id: string): Promise<IVideoDocument> {
    const video = await Video.findById(id)
      .populate('author', 'name email avatar')
      .exec();

    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    return video;
  }

  static async updateVideo(
    id: string,
    data: UpdateVideoDto,
  ): Promise<IVideoDocument> {
    const video = await Video.findById(id).exec();
    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    if (
      data.status === ContentStatus.PUBLISHED &&
      video.status !== ContentStatus.PUBLISHED &&
      !video.publishedAt
    ) {
      video.publishedAt = new Date();
    }

    Object.assign(video, data);
    await video.save();

    return (await video.populate('author', 'name email avatar')) as IVideoDocument;
  }

  static async publishVideo(id: string): Promise<IVideoDocument> {
    const video = await Video.findById(id).exec();
    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    video.status = ContentStatus.PUBLISHED;
    if (!video.publishedAt) {
      video.publishedAt = new Date();
    }

    await video.save();
    return (await video.populate('author', 'name email avatar')) as IVideoDocument;
  }

  static async unpublishVideo(id: string): Promise<IVideoDocument> {
    const video = await Video.findById(id).exec();
    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    video.status = ContentStatus.DRAFT;
    await video.save();
    return (await video.populate('author', 'name email avatar')) as IVideoDocument;
  }

  static async deleteVideo(id: string): Promise<void> {
    const video = await Video.findById(id).exec();
    if (!video) {
      throw ApiError.notFound('Video not found');
    }

    await Video.findByIdAndDelete(id).exec();
  }
}
