import React from 'react';
import { cn } from '@/lib/utils/cn';

interface UserAvatarProps {
  name: string;
  avatar?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
};

export function UserAvatar({
  name,
  avatar,
  size = 'md',
  className,
}: UserAvatarProps) {
  const initial = name?.trim() ? name.trim().charAt(0).toUpperCase() : 'U';

  if (avatar) {
    return (
      <div
        className={cn(
          'relative rounded-xl overflow-hidden shrink-0 border border-border shadow-subtle',
          sizeClasses[size],
          className,
        )}
      >
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl shrink-0 flex items-center justify-center font-bold font-mono bg-primary/10 text-primary border border-primary/25 shadow-subtle select-none',
        sizeClasses[size],
        className,
      )}
      aria-label={name}
    >
      <span>{initial}</span>
    </div>
  );
}
