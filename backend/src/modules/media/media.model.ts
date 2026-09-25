import { Schema, model } from 'mongoose';
import { IMediaDocument } from './media.types';

const mediaSchema = new Schema<IMediaDocument>(
  {
    filename: {
      type: String,
      required: [true, 'Filename is required'],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, 'Original name is required'],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required'],
      trim: true,
      index: true,
    },
    size: {
      type: Number,
      required: [true, 'File size is required'],
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    url: {
      type: String,
      required: [true, 'Public URL is required'],
      trim: true,
    },
    key: {
      type: String,
      required: [true, 'Storage key is required'],
      unique: true,
      trim: true,
      index: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploader user is required'],
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret['__v'];
        return ret;
      },
    },
  },
);

mediaSchema.index({ createdAt: -1 });

export const Media = model<IMediaDocument>('Media', mediaSchema);
