import path from 'path';
import crypto from 'crypto';
import { QueryFilter } from 'mongoose';
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client, R2_CONFIG } from '../../config/r2.config';
import { Media } from './media.model';
import '../users/user.model';
import { IMediaDocument } from './media.types';
import { ListMediaQueryDto, PresignedUrlDto } from './media.validation';
import { PaginatedResult } from '../../types/common.types';
import { ApiError } from '../../utils/api-error';
import { getPaginationOptions, createPaginatedResult } from '../../utils/pagination';

export class MediaService {
  private static generateKey(
    folder: string,
    originalName: string,
  ): { key: string; filename: string } {
    const ext = path.extname(originalName).toLowerCase();
    const hash = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    const filename = `${timestamp}-${hash}${ext}`;
    const cleanFolder = folder.replace(/^\/+|\/+$/g, '') || 'general';
    const key = `${cleanFolder}/${filename}`;
    return { key, filename };
  }

  static async uploadFile(
    file: Express.Multer.File,
    folder: string,
    userId: string,
  ): Promise<IMediaDocument> {
    const { key, filename } = this.generateKey(folder, file.originalname);

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await r2Client.send(command);
    } catch (error) {
      console.error('Cloudflare R2 Upload Error:', error);
      throw ApiError.internal('Failed to upload file to Cloudflare R2');
    }

    const publicUrl = `${R2_CONFIG.publicUrl}/${key}`;

    const media = new Media({
      filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: publicUrl,
      key,
      uploadedBy: userId,
    });
    await media.save();

    return (await media.populate('uploadedBy', 'name email avatar')) as IMediaDocument;
  }

  static async generatePresignedUploadUrl(
    dto: PresignedUrlDto,
    _userId: string,
  ): Promise<{ uploadUrl: string; publicUrl: string; key: string; filename: string }> {
    const { key, filename } = this.generateKey(dto.folder, dto.filename);

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      ContentType: dto.contentType,
    });

    try {
      // Presigned URL valid for 15 minutes (900s)
      const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 900 });
      const publicUrl = `${R2_CONFIG.publicUrl}/${key}`;

      return {
        uploadUrl,
        publicUrl,
        key,
        filename,
      };
    } catch (error) {
      console.error('Failed to generate presigned upload URL:', error);
      throw ApiError.internal('Failed to generate presigned upload URL');
    }
  }

  static async getMediaList(
    query: ListMediaQueryDto,
  ): Promise<PaginatedResult<IMediaDocument>> {
    const { page, limit, skip } = getPaginationOptions({
      page: query.page,
      limit: query.limit,
    });

    const filter: QueryFilter<IMediaDocument> = {};

    if (query.folder) {
      filter.key = new RegExp(`^${query.folder}/`, 'i');
    }

    if (query.mimeType) {
      filter.mimeType = query.mimeType;
    }

    const [items, total] = await Promise.all([
      Media.find(filter)
        .populate('uploadedBy', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      Media.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(items, total, page, limit);
  }

  static async deleteMedia(id: string): Promise<void> {
    const media = await Media.findById(id).exec();
    if (!media) {
      throw ApiError.notFound('Media item not found');
    }

    const command = new DeleteObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: media.key,
    });

    try {
      await r2Client.send(command);
    } catch (error) {
      console.warn(`Failed to delete object '${media.key}' from R2:`, error);
      // Proceed to remove from DB even if R2 delete encountered a warning
    }

    await Media.findByIdAndDelete(id).exec();
  }
}
