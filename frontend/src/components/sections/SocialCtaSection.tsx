import React from 'react';
import { Users } from 'lucide-react';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { Settings } from '@/types/api';

interface SocialCtaSectionProps {
  settings?: Settings | null;
}

export function SocialCtaSection({ settings }: SocialCtaSectionProps) {
  return (
    <section className="text-center py-12 sm:py-16 rounded-3xl border border-border bg-card p-8 space-y-6 shadow-card relative overflow-hidden">
      <div className="max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <Users className="h-3.5 w-3.5" />
          <span>مجتمع خمسة</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
          خليك قريب
        </h2>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          المحتوى مش واقف هنا. تابعنا على المنصات اللي بتحبها وخليك دايمًا قريب من كل جديد وشروحات
          وكبسولات برمجية يومية.
        </p>
      </div>

      <div className="flex justify-center pt-2">
        <SocialLinks
          links={settings?.socialLinks}
          variant="buttons"
          className="justify-center"
        />
      </div>
    </section>
  );
}
