import React from 'react';

export function QuoteSection() {
  return (
    <section className="relative rounded-3xl border border-border bg-[#050507] text-white p-8 sm:p-14 lg:p-18 text-center space-y-6 shadow-2xl overflow-hidden">
      {/* Background Decorative Gold Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        <span className="text-4xl sm:text-5xl text-primary font-serif select-none">“</span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug">
          مش هنخلي البرمجة سهلة... <br />
          <span className="text-primary bg-gradient-to-l from-gold-400 via-gold-300 to-amber-200 bg-clip-text text-transparent">
            هنخلي فهمها أسهل.
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wider pt-2">
          خمسة برمجة بالبلدي — افهمها بالبلدي.. اكتبها بالكود.
        </p>
      </div>
    </section>
  );
}
