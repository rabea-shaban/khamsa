'use client';

import React from 'react';
import Link from 'next/link';
import { ArticleAuthor } from '@/data/static-articles/types';
import { Github, Linkedin, Youtube, Facebook, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

interface AuthorBoxProps {
  author: ArticleAuthor;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  const authorEmail = author.email || 'r.shaban.2016@gmail.com';

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-card transition-all hover:border-primary/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Author Avatar */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/40 bg-surface shadow-subtle">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="relative z-10 h-full w-full object-cover"
              onError={(e) => {
                // Fallback to stylized monogram if image not present
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary font-black text-2xl">
            {author.name ? author.name.charAt(0) : 'ر'}
          </div>
        </div>

        {/* Author Meta & Details */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>كاتب ومطور معتمد</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            {author.name}
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-primary font-mono" dir="ltr">
            {author.role}
          </p>

          <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed font-normal">
            {author.bio}
          </p>
        </div>
      </div>

      {/* Social Links & About Page Link */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-foreground-muted font-bold">تواصل مع الكاتب:</span>
          {authorEmail && (
            <a
              href={`mailto:${authorEmail}`}
              title={`إرسال بريد إلكتروني إلى: ${authorEmail}`}
              className="p-2 rounded-xl bg-secondary text-foreground-muted hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {author.socials?.github && (
            <a
              href={author.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              className="p-2 rounded-xl bg-secondary text-foreground-muted hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {author.socials?.linkedin && (
            <a
              href={author.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              className="p-2 rounded-xl bg-secondary text-foreground-muted hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {author.socials?.youtube && (
            <a
              href={author.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              title="YouTube Channel"
              className="p-2 rounded-xl bg-secondary text-foreground-muted hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </a>
          )}
          {author.socials?.facebook && (
            <a
              href={author.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              title="Facebook Page"
              className="p-2 rounded-xl bg-secondary text-foreground-muted hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
          )}
        </div>

        <Link
          href={author.aboutUrl || '/about'}
          className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
        >
          <span>المزيد عن قصة وفلسفة المنصة</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
