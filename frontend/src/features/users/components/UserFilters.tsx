import { Search, X, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UserRole } from '@/types/api';

interface UserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export function UserFilters({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  sort,
  onSortChange,
  onReset,
}: UserFiltersProps) {
  const hasActiveFilters =
    search.trim() !== '' ||
    roleFilter !== 'ALL' ||
    statusFilter !== 'ALL' ||
    sort !== 'latest';

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-card shadow-subtle">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="ابحث بالاسم أو البريد الإلكتروني..."
          className="pr-10 pl-8 h-10 text-xs bg-background/60"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
            aria-label="مسح البحث"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Select Filters Group */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Role Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={roleFilter}
            onChange={e => onRoleFilterChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            aria-label="تصفية حسب الدور"
          >
            <option value="ALL">كل الأدوار</option>
            <option value={UserRole.ADMIN}>ADMIN (مشرف)</option>
            <option value={UserRole.EDITOR}>EDITOR (محرر)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={statusFilter}
            onChange={e => onStatusFilterChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            aria-label="تصفية حسب الحالة"
          >
            <option value="ALL">كل الحالات</option>
            <option value="true">نشط</option>
            <option value="false">غير نشط</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={sort}
            onChange={e => onSortChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            aria-label="الترتيب"
          >
            <option value="latest">الأحدث تسجيلاً</option>
            <option value="oldest">الأقدم تسجيلاً</option>
            <option value="name_asc">الاسم (أ - ي)</option>
            <option value="name_desc">الاسم (ي - أ)</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-10 px-3 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            title="إعادة تعيين الفلاتر"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">إعادة تعيين</span>
          </Button>
        )}
      </div>
    </div>
  );
}
