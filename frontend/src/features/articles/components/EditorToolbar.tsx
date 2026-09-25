'use client';

import React, { useRef, useState } from 'react';
import { type Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Link2,
  Unlink,
  ImagePlus,
  Minus,
  Undo,
  Redo,
  UploadCloud,
  Globe,
  Loader2,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { mediaApi } from '@/lib/api/media.api';

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('أدخل الرابط (URL):', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'articles');

      const res = await mediaApi.uploadFile(formData);
      if (res.data?.url) {
        editor.chain().focus().setImage({ src: res.data.url, alt: file.name }).run();
      }
    } catch (err) {
      console.error('Failed to upload image:', err);
      alert('حدث خطأ أثناء رفع الصورة.');
    } finally {
      setIsUploading(false);
      setShowImageDialog(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlInsert = () => {
    if (!imageUrl.trim()) return;
    editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    setImageUrl('');
    setShowImageDialog(false);
  };

  const tools = [
    {
      label: 'عريض (Ctrl+B)',
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      label: 'مائل (Ctrl+I)',
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    {
      label: 'تسطير (Ctrl+U)',
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
    },
    {
      label: 'شطب',
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
    },
    { divider: true },
    {
      label: 'عنوان رئيسي (H1)',
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      label: 'عنوان فرعي (H2)',
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      label: 'عنوان قسم (H3)',
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
    },
    { divider: true },
    {
      label: 'قائمة نقطية',
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      label: 'قائمة مرقمة',
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      label: 'اقتباس',
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    { divider: true },
    {
      label: 'كود سطر',
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
    },
    {
      label: 'كتلة كود برمجي (Code Block)',
      icon: FileCode,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
    { divider: true },
    {
      label: 'إضافة / تعديل رابط',
      icon: Link2,
      action: setLink,
      isActive: editor.isActive('link'),
    },
    {
      label: 'إلغاء الرابط',
      icon: Unlink,
      action: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive('link'),
    },
    {
      label: 'إدراج صورة',
      icon: ImagePlus,
      action: () => setShowImageDialog(!showImageDialog),
      isActive: showImageDialog,
    },
    {
      label: 'فاصل أفقي',
      icon: Minus,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    { divider: true },
    {
      label: 'تراجع (Ctrl+Z)',
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
    },
    {
      label: 'إعادة (Ctrl+Y)',
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
    },
  ];

  return (
    <div className="relative border-b border-border bg-card/60 backdrop-blur-md p-2 rounded-t-2xl">
      <div className="flex flex-wrap items-center gap-1">
        {tools.map((tool, idx) => {
          if ('divider' in tool) {
            return <div key={idx} className="h-5 w-px bg-border mx-1.5" />;
          }

          const Icon = tool.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={tool.action}
              disabled={tool.disabled}
              title={tool.label}
              aria-label={tool.label}
              className={cn(
                'p-2 rounded-xl text-xs transition-all flex items-center justify-center font-medium',
                tool.isActive
                  ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 scale-105'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                tool.disabled && 'opacity-30 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      {/* Image Insert/Upload Popover Modal */}
      {showImageDialog && (
        <div className="absolute top-full right-4 mt-2 w-84 p-4 rounded-2xl bg-card border border-border shadow-2xl z-30 space-y-3.5 text-right backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-primary" />
              إدراج صورة داخل المقال
            </span>
            <button
              type="button"
              onClick={() => setShowImageDialog(false)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Upload directly */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-foreground/80 block">
              رفع صورة من الجهاز:
            </span>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileUpload}
              className="hidden"
              id="tiptap-image-upload"
              disabled={isUploading}
            />
            <label
              htmlFor="tiptap-image-upload"
              className={cn(
                'w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 text-primary text-xs font-bold cursor-pointer hover:bg-primary/10 transition-colors',
                isUploading && 'pointer-events-none opacity-60',
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>جارٍ رفع الصورة...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" />
                  <span>اختر صورة من جهازك</span>
                </>
              )}
            </label>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] text-muted-foreground font-mono">أو</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Direct URL input */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-foreground/80 block">
              رابط مباشر (URL):
            </span>
            <div className="flex gap-1.5">
              <input
                type="url"
                dir="ltr"
                placeholder="https://example.com/image.webp"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:border-primary font-mono"
              />
              <button
                type="button"
                onClick={handleUrlInsert}
                disabled={!imageUrl.trim()}
                className="px-3.5 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold disabled:opacity-50 transition-colors"
                title="إدراج"
              >
                <Globe className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
