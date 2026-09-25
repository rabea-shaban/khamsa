import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { UserRole } from '@/types/api';
import { cn } from '@/lib/utils/cn';

interface UserRoleBadgeProps {
  role: UserRole;
  className?: string;
  size?: 'sm' | 'md';
}

export function UserRoleBadge({ role, className, size = 'sm' }: UserRoleBadgeProps) {
  const isAdmin = role === UserRole.ADMIN;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-mono font-bold tracking-tight select-none border transition-colors',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        isAdmin
          ? 'bg-primary/10 text-primary border-primary/30 shadow-subtle'
          : 'bg-secondary text-foreground-secondary border-border',
        className,
      )}
    >
      {isAdmin ? (
        <ShieldCheck className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      ) : (
        <UserCheck className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      )}
      <span>{role}</span>
    </span>
  );
}
