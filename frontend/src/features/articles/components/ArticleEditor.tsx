'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { AlertTriangle } from 'lucide-react';
import { EditorToolbar } from './EditorToolbar';
import { cn } from '@/lib/utils/cn';

interface ArticleEditorProps {
  content?: Record<string, unknown> | string | null;
  onChange: (content: Record<string, unknown>) => void;
  className?: string;
  error?: string;
}

export function ArticleEditor({
  content,
  onChange,
  className,
  error,
}: ArticleEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        link: {
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary underline font-medium underline-offset-4 hover:text-primary/80',
          },
        },
        underline: {},
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-2xl max-h-[500px] w-full object-cover border border-border shadow-xl my-6 mx-auto',
        },
      }),
      Placeholder.configure({
        placeholder: 'ابدأ كتابة محتوى المقال والدروس البرمجية هنا بالتفصيل...',
      }),
    ],
    content: typeof content === 'object' ? content : undefined,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/90 prose-p:leading-relaxed prose-code:font-mono prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:text-foreground max-w-none min-h-[420px] p-5 sm:p-7 focus:outline-none text-right font-sans text-foreground text-base leading-relaxed',
        dir: 'rtl',
      },
    },
    onUpdate: ({ editor: ed }) => {
      const json = ed.getJSON();
      onChange(json as Record<string, unknown>);
    },
  });

  // Synchronize external content changes when editing
  useEffect(() => {
    if (editor && content) {
      const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(content);
      if (!isSame) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-border bg-card shadow-xl transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden',
        error && 'border-destructive focus-within:ring-destructive/20',
        className,
      )}
    >
      <EditorToolbar editor={editor} />
      <div className="bg-card/40">
        <EditorContent editor={editor} />
      </div>
      {error && (
        <div className="p-3 bg-destructive/10 border-t border-destructive/20 text-xs text-destructive font-semibold flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
