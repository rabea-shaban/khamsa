import React from 'react';
import Link from 'next/link';
import { BookOpen, Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FinalCtaSection() {
  return (
    <section className="text-center py-14 sm:py-20 rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card to-card p-8 sm:p-12 space-y-6 shadow-card relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-primary/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
          جاهز تبدأ تفهم البرمجة بشكل مختلف؟
        </h2>
        <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
          ابدأ بمقال، شاهد فيديو، جرّب كود... وخلي أول خطوة هي البداية الحقيقية لرحلتك.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link href="/articles">
          <Button size="lg" className="gap-2 px-8 text-sm font-bold shadow-card">
            <BookOpen className="h-4 w-4" />
            <span>استكشف المقالات</span>
          </Button>
        </Link>
        <Link href="/videos">
          <Button variant="outline" size="lg" className="gap-2 px-8 text-sm font-bold bg-card">
            <Video className="h-4 w-4 text-primary" />
            <span>شاهد الفيديوهات</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
