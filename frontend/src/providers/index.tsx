'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { AuthProvider } from '@/features/auth';
import { DynamicFavicon } from '@/components/shared/DynamicFavicon';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryProvider>
        <AuthProvider>
          <DynamicFavicon />
          {children}
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

