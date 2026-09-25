'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

type Theme = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | string) => void;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  themes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'theme';

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = THEME_KEY,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  // Get current system theme
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored === 'dark' || stored === 'light' || stored === 'system') {
        setThemeState(stored);
      } else {
        setThemeState(defaultTheme);
      }
    } catch {
      setThemeState(defaultTheme);
    }

    setSystemTheme(getSystemTheme());
    setMounted(true);
  }, [storageKey, defaultTheme, getSystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const newSysTheme = mediaQuery.matches ? 'dark' : 'light';
      setSystemTheme(newSysTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute resolved theme
  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (!mounted) return defaultTheme === 'light' ? 'light' : 'dark';
    if (theme === 'system') return systemTheme;
    return theme === 'light' ? 'light' : 'dark';
  }, [mounted, theme, systemTheme, defaultTheme]);

  // Apply .dark class to <html>
  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;

    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [mounted, resolvedTheme]);

  const setTheme = useCallback(
    (newTheme: Theme | string) => {
      const validTheme: Theme =
        newTheme === 'light' || newTheme === 'dark' || newTheme === 'system'
          ? newTheme
          : 'dark';

      setThemeState(validTheme);
      try {
        localStorage.setItem(storageKey, validTheme);
      } catch {
        // Ignore storage errors
      }
    },
    [storageKey],
  );

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
      themes: ['dark', 'light', 'system'],
    }),
    [theme, setTheme, resolvedTheme, systemTheme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback safe context if used outside provider
    return {
      theme: 'dark',
      setTheme: () => {},
      resolvedTheme: 'dark',
      systemTheme: 'dark',
      themes: ['dark', 'light', 'system'],
    };
  }
  return context;
}
