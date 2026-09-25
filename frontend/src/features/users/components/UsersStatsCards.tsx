import React from 'react';
import { Users, ShieldCheck, UserCheck, CheckCircle2, UserX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { UserStats } from '@/lib/api/users.api';

interface UsersStatsCardsProps {
  stats?: UserStats;
  isLoading: boolean;
}

export function UsersStatsCards({ stats, isLoading }: UsersStatsCardsProps) {
  const cards = [
    {
      title: 'إجمالي المستخدمين',
      value: stats?.total ?? 0,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
    },
    {
      title: 'المشرفون (ADMIN)',
      value: stats?.admins ?? 0,
      icon: ShieldCheck,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      title: 'المحررون (EDITOR)',
      value: stats?.editors ?? 0,
      icon: UserCheck,
      color: 'text-sky-500',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20',
    },
    {
      title: 'الحسابات النشطة',
      value: stats?.active ?? 0,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: 'الحسابات المعطلة',
      value: stats?.inactive ?? 0,
      icon: UserX,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-500/10',
      borderColor: 'border-zinc-500/20',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {[...Array(5)].map((_, idx) => (
          <Card key={idx} className="border border-border bg-card p-4">
            <div className="flex items-center justify-between pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 rounded-xl" />
            </div>
            <Skeleton className="h-7 w-12 mt-1" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            className="border border-border bg-card hover:border-border-light transition-all duration-normal shadow-card"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground truncate">
                  {card.title}
                </span>
                <div
                  className={`h-8 w-8 rounded-xl ${card.bgColor} ${card.color} border ${card.borderColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black font-mono text-foreground">
                {card.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
