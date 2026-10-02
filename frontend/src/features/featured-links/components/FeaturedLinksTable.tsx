'use client';

import React from 'react';
import {
  Edit,
  Trash2,
  ExternalLink,
  Link2,
  Plus,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { FeaturedLink } from '@/types/api';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface FeaturedLinksTableProps {
  links: FeaturedLink[];
  isLoading: boolean;
  onEdit: (link: FeaturedLink) => void;
  onDelete: (link: FeaturedLink) => void;
  onToggleActive: (id: string) => void;
  onAddNew: () => void;
  isFiltered?: boolean;
}

export function FeaturedLinksTable({
  links,
  isLoading,
  onEdit,
  onDelete,
  onToggleActive,
  onAddNew,
  isFiltered,
}: FeaturedLinksTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="p-4 rounded-2xl border border-border bg-card flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-3 w-64" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <EmptyState
        icon={Link2}
        title={isFiltered ? 'لم يتم العثور على نتائج مطابقة' : 'لا توجد روابط مميزة بعد'}
        description={
          isFiltered
            ? 'جرب البحث بكلمات أخرى أو إعادة تعيين الفلاتر.'
            : 'أضف أول رابط مميز أو إعلان أو منحة ليظهر للزوار في أعلى صفحة /links.'
        }
        action={
          !isFiltered ? (
            <Button onClick={onAddNew} size="sm" className="gap-2 text-xs font-bold mt-2">
              <Plus className="h-4 w-4" />
              <span>+ إضافة رابط مميز</span>
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface/50 text-foreground-muted font-bold">
                <th className="py-3.5 px-4">الصورة</th>
                <th className="py-3.5 px-4">اسم الرابط / الإعلان</th>
                <th className="py-3.5 px-4">الرابط الموجه</th>
                <th className="py-3.5 px-4 text-center">الترتيب</th>
                <th className="py-3.5 px-4 text-center">الحالة</th>
                <th className="py-3.5 px-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {links.map(link => (
                <tr
                  key={link._id}
                  className="hover:bg-surface-hover/50 transition-colors group"
                >
                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-border bg-surface shrink-0">
                      <img
                        src={link.image}
                        alt={link.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </td>

                  {/* Title */}
                  <td className="py-3 px-4 font-bold text-foreground max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{link.title}</span>
                      {link.isActive && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold shrink-0">
                          مميز
                        </span>
                      )}
                    </div>
                  </td>

                  {/* URL */}
                  <td className="py-3 px-4 font-mono text-muted-foreground max-w-xs">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-primary transition-colors truncate"
                      dir="ltr"
                    >
                      <span className="truncate">{link.url}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </td>

                  {/* Order */}
                  <td className="py-3 px-4 text-center font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-surface border border-border text-foreground font-bold">
                      {link.order ?? 0}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <Switch
                        checked={link.isActive}
                        onCheckedChange={() => onToggleActive(link._id)}
                        aria-label={`تغيير حالة ${link.title}`}
                      />
                      <span
                        className={`text-[11px] font-bold ${
                          link.isActive ? 'text-emerald-500' : 'text-muted-foreground'
                        }`}
                      >
                        {link.isActive ? 'مفعّل' : 'معطّل'}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(link)}
                        className="h-8 px-2.5 text-xs font-semibold hover:border-primary/50 hover:text-primary"
                        title="تعديل الرابط"
                      >
                        <Edit className="h-3.5 w-3.5 ml-1" />
                        <span>تعديل</span>
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(link)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:border-destructive/40"
                        title="حذف الرابط"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {links.map(link => (
          <div
            key={link._id}
            className="p-4 rounded-2xl border border-border bg-card space-y-3 shadow-card"
          >
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-border bg-surface shrink-0">
                <img
                  src={link.image}
                  alt={link.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs text-foreground truncate">
                    {link.title}
                  </h4>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface border border-border text-foreground font-bold shrink-0">
                    #{link.order ?? 0}
                  </span>
                </div>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-primary truncate max-w-full"
                  dir="ltr"
                >
                  <span className="truncate">{link.url}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              {/* Active Switch */}
              <div className="flex items-center gap-2">
                <Switch
                  checked={link.isActive}
                  onCheckedChange={() => onToggleActive(link._id)}
                />
                <span
                  className={`text-xs font-bold ${
                    link.isActive ? 'text-emerald-500' : 'text-muted-foreground'
                  }`}
                >
                  {link.isActive ? 'مفعّل' : 'معطّل'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(link)}
                  className="h-8 px-2.5 text-xs font-semibold"
                >
                  <Edit className="h-3.5 w-3.5 ml-1" />
                  <span>تعديل</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(link)}
                  className="h-8 w-8 p-0 text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
