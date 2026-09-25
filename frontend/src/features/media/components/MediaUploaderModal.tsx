'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useUploadMedia } from '../hooks/useMedia';

interface MediaUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const FOLDERS = [
  { value: 'articles', label: 'المقالات (articles)' },
  { value: 'videos', label: 'الفيديوهات (videos)' },
  { value: 'general', label: 'عام (general)' },
  { value: 'settings', label: 'الإعدادات والهوية (settings)' },
];

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function MediaUploaderModal({ isOpen, onClose, onSuccess }: MediaUploaderModalProps) {
  const [folder, setFolder] = useState('articles');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadMutation = useUploadMedia();

  const handleFile = (file: File) => {
    setErrorMsg(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMsg('نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPEG أو PNG أو WEBP أو AVIF.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg('حجم الملف كبير جداً. الحد الأقصى المسموح به هو 10 ميجابايت.');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadMutation.mutateAsync({
        file: selectedFile,
        folder,
      });
      handleReset();
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'حدث خطأ أثناء رفع الصورة، حاول مرة أخرى.';
      setErrorMsg(message);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="رفع صورة جديدة"
      description="اختر المجلد المستهدف وارفع الصورة ليتم حفظها وتوفير رابط مباشر فائق السرعة لها."
      size="sm"
    >
      <div className="space-y-5">
        {/* Target Folder Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground block">
            المجلد المستهدف (Folder):
          </label>
          <Select
            value={folder}
            onChange={e => setFolder(e.target.value)}
            options={FOLDERS}
            className="w-full text-xs"
          />
        </div>

        {/* Dropzone Area */}
        {!selectedFile ? (
          <div
            onDragOver={e => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center space-y-3 transition-colors ${
              isDragOver
                ? 'border-primary bg-primary/10'
                : 'border-border/80 hover:border-primary/50 bg-secondary/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Upload className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">
                اسحب وأفلت الصورة هنا، أو <span className="text-primary underline">تصفح الملفات</span>
              </p>
              <p className="text-[11px] text-foreground-muted">
                الصيغ المدعومة: JPEG, PNG, WEBP, AVIF (بحد أقصى 10MB)
              </p>
            </div>
          </div>
        ) : (
          /* Preview Selected Image */
          <div className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-3">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/40 border border-border">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              )}
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-2 left-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="إلغاء الصورة"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
              <span className="truncate max-w-[200px] text-foreground font-bold font-sans">
                {selectedFile.name}
              </span>
              <span>{formatFileSize(selectedFile.size)}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={uploadMutation.isPending}
            className="text-xs"
          >
            إلغاء
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleUpload}
            disabled={!selectedFile || uploadMutation.isPending}
            className="gap-2 text-xs font-bold shadow-card px-6"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                <span>جاري الرفع...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>بدء الرفع</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
