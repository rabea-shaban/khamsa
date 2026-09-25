'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Database,
  CloudUpload,
  Clock,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Loader2,
  RefreshCw,
  HardDrive,
  FileArchive,
} from 'lucide-react';
import { backupApi, BackupItem } from '@/lib/api/backup.api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function BackupsTab() {
  const queryClient = useQueryClient();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['admin-backups'],
    queryFn: () => backupApi.getBackups(),
    staleTime: 30 * 1000,
  });

  const triggerMutation = useMutation({
    mutationFn: () => backupApi.triggerBackup(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin-backups'] });
      setSuccessMsg(`تم إنشاء ورفع نسخة احتياطية سحابية جديدة بنجاح! (${res.data?.filename})`);
      setTimeout(() => setSuccessMsg(null), 5000);
    },
  });

  const backups: BackupItem[] = data?.data || [];

  const handleCopy = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Status */}
      <Card className="border border-border bg-card shadow-card relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <CardHeader className="pb-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-bold">النسخ الاحتياطي السحابي التلقائي</CardTitle>
              </div>
              <CardDescription className="text-xs">
                تأمين وحفظ بيانات المنصة (المستخدمين، المقالات، الفيديوهات، الوسائط، والإعدادات) سحابياً ومحلياً
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="gap-1.5 text-xs h-9"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin text-primary' : ''}`} />
                <span>تحديث القائمة</span>
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => triggerMutation.mutate()}
                disabled={triggerMutation.isPending}
                className="gap-2 font-bold shadow-card text-xs h-9"
              >
                {triggerMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>جارٍ إنشاء النسخة الاحتياطية...</span>
                  </>
                ) : (
                  <>
                    <CloudUpload className="h-4 w-4" />
                    <span>أخذ نسخة احتياطية الآن</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Stats & Config Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>الجدولة التلقائية</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                مفعلة وتعمل تلقائياً على السيرفر كل 24 ساعة
              </p>
              <Badge variant="primary" className="text-[10px] mt-1">
                Active Scheduler
              </Badge>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <HardDrive className="h-3.5 w-3.5 text-sky-400" />
                <span>التخزين السحابي</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                مرفوعة ومضغوطة بصيغة GZIP ومشفرة سحابياً
              </p>
              <Badge variant="secondary" className="text-[10px] mt-1 font-mono">
                Encrypted & GZipped
              </Badge>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>إجمالي النسخ المحفوظة</span>
              </div>
              <div className="text-xl font-black text-foreground font-mono">
                {isLoading ? '...' : backups.length}
              </div>
              <p className="text-[11px] text-muted-foreground">نسخة متوفرة للاسترجاع</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backups List Table */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <FileArchive className="h-4 w-4 text-primary" />
            <span>سجل النسخ الاحتياطية المتاحة (Available Backups)</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">جاري استرجاع قائمة النسخ الاحتياطية...</p>
            </div>
          ) : backups.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <Database className="h-8 w-8 text-muted-foreground opacity-40 mx-auto" />
              <p className="text-xs font-bold text-foreground">لا توجد نسخ احتياطية مسجلة بعد</p>
              <p className="text-[11px] text-muted-foreground">
                اضغط على زر &quot;أخذ نسخة احتياطية الآن&quot; لإنشاء أول نسخة وحفظها سحابياً.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/40 text-foreground-muted font-bold">
                    <th className="py-3 px-4">اسم ملف النسخة</th>
                    <th className="py-3 px-4 w-44">تاريخ ووقت النسخ</th>
                    <th className="py-3 px-4 w-28">حجم الملف</th>
                    <th className="py-3 px-4 w-44 text-left">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {backups.map(item => {
                    const formattedDate = new Date(item.timestamp).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    const isCopied = copiedKey === item.key;

                    return (
                      <tr key={item.key} className="hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-foreground">
                          <div className="flex items-center gap-2">
                            <FileArchive className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="truncate max-w-xs sm:max-w-md" dir="ltr">
                              {item.filename}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-muted-foreground/70" />
                            <span>{formattedDate}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-foreground">
                          {formatSize(item.sizeBytes)}
                        </td>

                        <td className="py-3 px-4 text-left">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopy(item.url, item.key)}
                              className="p-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary-hover text-foreground transition-colors"
                              title="نسخ رابط التحميل السحابي"
                            >
                              {isCopied ? (
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>

                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={item.filename}
                            >
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1.5 text-xs font-bold bg-card"
                              >
                                <Download className="h-3.5 w-3.5 text-primary" />
                                <span>تحميل النسخة</span>
                              </Button>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
