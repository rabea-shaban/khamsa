import { Document, Types } from 'mongoose';
import { ContentStatus, VideoPlatform } from '../../types/common.types';

export interface IVideo {
  title: string;
  description: string;
  platform: VideoPlatform;
  url: string;
  thumbnail?: string;
  status: ContentStatus;
  author: Types.ObjectId;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideoDocument extends IVideo, Document {
  _id: Types.ObjectId;
}

export interface CreateVideoInput {
  title: string;
  description: string;
  platform: VideoPlatform;
  url: string;
  thumbnail?: string;
  status?: ContentStatus;
}

export interface UpdateVideoInput {
  title?: string;
  description?: string;
  platform?: VideoPlatform;
  url?: string;
  thumbnail?: string;
  status?: ContentStatus;
}
