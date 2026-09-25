import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl',
  };

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'K';

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-surface-hover border border-border text-foreground font-bold overflow-hidden select-none',
        sizes[size],
        className,
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-primary font-bold">{initials}</span>
      )}
    </div>
  );
}
