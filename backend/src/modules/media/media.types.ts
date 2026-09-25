import { Document, Types } from 'mongoose';

export interface IMedia {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  url: string;
  key: string;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
}

export interface IMediaDocument extends IMedia, Document {
  _id: Types.ObjectId;
}

export interface UploadMediaResult {
  url: string;
  key: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
}
