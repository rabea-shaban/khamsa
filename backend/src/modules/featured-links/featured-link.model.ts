import { Schema, model } from 'mongoose';
import { IFeaturedLinkDocument } from './featured-link.types';

const featuredLinkSchema = new Schema<IFeaturedLinkDocument>(
  {
    title: {
      type: String,
      required: [true, 'Featured link title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },
    image: {
      type: String,
      required: [true, 'Featured link image is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Featured link URL is required'],
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
      maxlength: [50, 'Badge cannot exceed 50 characters'],
      default: '',
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
      default: '',
    },
    ctaText: {
      type: String,
      trim: true,
      maxlength: [50, 'CTA Text cannot exceed 50 characters'],
      default: '',
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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

featuredLinkSchema.index({ isActive: 1, order: 1, createdAt: -1 });

export const FeaturedLink = model<IFeaturedLinkDocument>('FeaturedLink', featuredLinkSchema);
