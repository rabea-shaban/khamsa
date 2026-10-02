import { Document, Types } from 'mongoose';

export interface IFeaturedLink {
  title: string;
  image: string;
  url: string;
  badge?: string;
  description?: string;
  ctaText?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeaturedLinkDocument extends IFeaturedLink, Document {
  _id: Types.ObjectId;
}

export interface CreateFeaturedLinkInput {
  title: string;
  image: string;
  url: string;
  badge?: string;
  description?: string;
  ctaText?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateFeaturedLinkInput {
  title?: string;
  image?: string;
  url?: string;
  badge?: string;
  description?: string;
  ctaText?: string;
  order?: number;
  isActive?: boolean;
}
