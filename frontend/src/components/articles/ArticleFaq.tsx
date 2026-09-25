'use client';

import React, { useState } from 'react';
import { ArticleFAQ } from '@/data/static-articles/types';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleFaqProps {
  faq: ArticleFAQ[];
}

export function ArticleFaq({ faq }: ArticleFaqProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  if (!faq || faq.length === 0) return null;

  const toggleItem = (idx: number) => {
    setOpenIndexes(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="space-y-6 pt-10 border-t border-border" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-black text-foreground">
            الأسئلة الشائعة والمفاهيم الجوهرية (FAQ)
          </h2>
          <p className="text-xs text-foreground-muted">
            إجابات مهندسينا المركزة على أكثر التساؤلات البرمجية شيوعاً في هذا الموضوع
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);

          return (
            <div
              key={idx}
              className={cn(
                'rounded-2xl border transition-all duration-200 overflow-hidden bg-card',
                isOpen ? 'border-primary/40 shadow-sm' : 'border-border hover:border-border/80'
              )}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-foreground focus:outline-none select-none"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-primary shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-foreground-secondary leading-relaxed border-t border-border/40 font-normal">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
