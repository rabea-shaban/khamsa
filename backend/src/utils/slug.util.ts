import slugify from 'slugify';
import { Model } from 'mongoose';

export const generateSlug = (text: string): string => {
  // slugify handles latin and remove special chars
  // For Arabic, we clean special symbols while preserving arabic words
  const baseSlug = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s\u0621-\u064A-]/g, '') // Keep Arabic and alphanumeric
    .replace(/[\s_-]+/g, '-')              // Replace spaces with hyphen
    .replace(/^-+|-+$/g, '');              // Remove leading/trailing hyphens

  return baseSlug || slugify(text, { lower: true, strict: true, trim: true }) || `post-${Date.now()}`;
};

export const getUniqueSlug = async <T>(
  model: Model<T>,
  title: string,
  customSlug?: string,
  excludeId?: string,
): Promise<string> => {
  const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const query: Record<string, unknown> = { slug: uniqueSlug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existing = await model.findOne(query).lean().exec();
    if (!existing) {
      break;
    }

    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
