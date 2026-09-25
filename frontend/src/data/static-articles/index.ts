import { StaticArticle } from './types';
import { article01 } from './articles/01-modern-javascript';
import { article02 } from './articles/02-comprehensive-typescript';
import { article03 } from './articles/03-react-19-architecture';
import { article04 } from './articles/04-nextjs-app-router';
import { article05 } from './articles/05-advanced-nodejs';
import { article06 } from './articles/06-express-clean-architecture';
import { article07 } from './articles/07-comprehensive-mongodb';
import { article08 } from './articles/08-web-security-owasp';
import { article09 } from './articles/09-auth-jwt-sessions-rbac';
import { article10 } from './articles/10-system-design-distributed';
import { article11 } from './articles/11-advanced-caching-redis';
import { article12 } from './articles/12-modern-frontend-architecture';
import { article13 } from './articles/13-git-github-cicd';
import { article14 } from './articles/14-docker-containerization';
import { article15 } from './articles/15-web-performance-cwv';
import { article16 } from './articles/16-software-testing-guide';
import { article17 } from './articles/17-graphql-vs-rest';
import { article18 } from './articles/18-database-architecture-sql-nosql';
import { article19 } from './articles/19-modern-css-tailwind';
import { article20 } from './articles/20-clean-code-solid-design-patterns';

export * from './types';

export const STATIC_ARTICLES: StaticArticle[] = [
  article01,
  article02,
  article03,
  article04,
  article05,
  article06,
  article07,
  article08,
  article09,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20,
];

export function getAllStaticArticles(): StaticArticle[] {
  return [...STATIC_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getStaticArticleBySlug(slug: string): StaticArticle | undefined {
  const decoded = decodeURIComponent(slug).trim().toLowerCase();
  return STATIC_ARTICLES.find(
    a => a.slug.toLowerCase() === decoded || encodeURIComponent(a.slug).toLowerCase() === decoded
  );
}

export function getStaticArticleSlugs(): string[] {
  return STATIC_ARTICLES.map(a => a.slug);
}

export function getRelatedStaticArticles(article: StaticArticle, limit = 3): StaticArticle[] {
  // First, find explicitly defined related slugs
  const explicit = STATIC_ARTICLES.filter(
    a => a.slug !== article.slug && article.relatedSlugs?.includes(a.slug)
  );

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  // Next, fallback to same category
  const sameCategory = STATIC_ARTICLES.filter(
    a =>
      a.slug !== article.slug &&
      !explicit.some(e => e.slug === a.slug) &&
      a.category === article.category
  );

  // Next, fallback to any other articles
  const others = STATIC_ARTICLES.filter(
    a =>
      a.slug !== article.slug &&
      !explicit.some(e => e.slug === a.slug) &&
      !sameCategory.some(s => s.slug === a.slug)
  );

  return [...explicit, ...sameCategory, ...others].slice(0, limit);
}

export function getStaticArticleCategories(): string[] {
  const categories = new Set<string>();
  STATIC_ARTICLES.forEach(a => categories.add(a.category));
  return Array.from(categories);
}
