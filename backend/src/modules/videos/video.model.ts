import { Schema, model } from 'mongoose';
import { IVideoDocument } from './video.types';
import { ContentStatus, VideoPlatform } from '../../types/common.types';

const videoSchema = new Schema<IVideoDocument>(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Video description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    platform: {
      type: String,
      enum: Object.values(VideoPlatform),
      required: [true, 'Platform is required'],
      index: true,
    },
    url: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(ContentStatus),
      default: ContentStatus.DRAFT,
      index: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret['__v'];
        return ret;
      },
    },
  },
);

videoSchema.index({ status: 1, publishedAt: -1 });
videoSchema.index({ status: 1, platform: 1, publishedAt: -1 });

export const Video = model<IVideoDocument>('Video', videoSchema);
