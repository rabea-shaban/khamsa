import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-fade-in">
      {/* Hero Skeleton */}
      <div className="space-y-6 max-w-3xl">
        <Skeleton className="h-7 w-48 rounded-full" />
        <Skeleton className="h-14 w-full sm:w-3/4 rounded-2xl" />
        <Skeleton className="h-8 w-2/3 rounded-xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-11 w-36 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 rounded-3xl border border-border bg-card space-y-4">
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
