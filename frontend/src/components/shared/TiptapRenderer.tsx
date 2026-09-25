'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
}

export interface TiptapRendererProps {
  content: Record<string, unknown> | string;
  className?: string;
}

function CodeBlockRenderer({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-2xl border border-border bg-[#0a0d14] overflow-hidden group shadow-card">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border text-xs font-mono text-foreground-muted">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <span className="mr-2 text-[11px] font-bold text-primary uppercase tracking-wider">
            {language || 'code'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-sans text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
          title="نسخ الكود"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary text-[11px] font-bold">تم النسخ</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium">نسخ</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono leading-relaxed text-slate-100 overflow-x-auto text-left dir-ltr">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderTextNode(node: TiptapNode, key: React.Key): React.ReactNode {
  if (!node.text) return null;

  let element: React.ReactNode = node.text;

  if (node.marks && node.marks.length > 0) {
    node.marks.forEach((mark, markIndex) => {
      switch (mark.type) {
        case 'bold':
          element = <strong key={markIndex} className="font-bold text-foreground">{element}</strong>;
          break;
        case 'italic':
          element = <em key={markIndex} className="italic">{element}</em>;
          break;
        case 'underline':
          element = <u key={markIndex} className="underline underline-offset-4">{element}</u>;
          break;
        case 'strike':
          element = <s key={markIndex} className="line-through text-foreground-muted">{element}</s>;
          break;
        case 'code':
          element = (
            <code
              key={markIndex}
              className="px-1.5 py-0.5 rounded-md bg-surface-elevated text-primary font-mono text-xs sm:text-sm border border-border mx-0.5"
            >
              {element}
            </code>
          );
          break;
        case 'link': {
          const href = (mark.attrs?.href as string) || '#';
          element = (
            <Link
              key={markIndex}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold underline underline-offset-4 hover:text-primary-hover transition-colors"
            >
              {element}
            </Link>
          );
          break;
        }
        case 'highlight':
          element = (
            <mark key={markIndex} className="bg-primary/20 text-primary px-1 py-0.5 rounded">
              {element}
            </mark>
          );
          break;
        default:
          break;
      }
    });
  }

  return <React.Fragment key={key}>{element}</React.Fragment>;
}

function renderTiptapNode(node: TiptapNode, key: React.Key): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case 'doc':
      return (
        <div key={key} className="space-y-5">
          {node.content?.map((child, idx) => renderTiptapNode(child, idx))}
        </div>
      );

    case 'paragraph':
      return (
        <p key={key} className="text-base sm:text-lg leading-relaxed text-foreground-secondary mb-4">
          {node.content?.map((child, idx) =>
            child.type === 'text' ? renderTextNode(child, idx) : renderTiptapNode(child, idx),
          )}
        </p>
      );

    case 'heading': {
      const level = (node.attrs?.level as number) || 2;
      const headingContent = node.content?.map((child, idx) =>
        child.type === 'text' ? renderTextNode(child, idx) : renderTiptapNode(child, idx),
      );

      switch (level) {
        case 1:
          return <h1 key={key} className="text-2xl sm:text-4xl font-extrabold text-foreground mt-8 mb-4 tracking-tight leading-tight">{headingContent}</h1>;
        case 2:
          return <h2 key={key} className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-3 border-r-4 border-primary pr-3 tracking-tight">{headingContent}</h2>;
        case 3:
          return <h3 key={key} className="text-lg sm:text-xl font-bold text-foreground mt-6 mb-2 tracking-tight">{headingContent}</h3>;
        case 4:
          return <h4 key={key} className="text-base sm:text-lg font-bold text-foreground mt-4 mb-2">{headingContent}</h4>;
        default:
          return <h5 key={key} className="text-sm sm:text-base font-bold text-foreground mt-4 mb-2">{headingContent}</h5>;
      }
    }

    case 'bulletList':
      return (
        <ul key={key} className="list-disc list-inside space-y-2 text-foreground-secondary pr-2 my-4">
          {node.content?.map((child, idx) => renderTiptapNode(child, idx))}
        </ul>
      );

    case 'orderedList':
      return (
        <ol key={key} className="list-decimal list-inside space-y-2 text-foreground-secondary pr-2 my-4">
          {node.content?.map((child, idx) => renderTiptapNode(child, idx))}
        </ol>
      );

    case 'listItem':
      return (
        <li key={key} className="leading-relaxed">
          {node.content?.map((child, idx) =>
            child.type === 'text' ? renderTextNode(child, idx) : renderTiptapNode(child, idx),
          )}
        </li>
      );

    case 'blockquote':
      return (
        <blockquote
          key={key}
          className="my-6 border-r-4 border-primary bg-surface p-4 sm:p-5 rounded-l-2xl text-foreground-secondary italic text-base leading-relaxed"
        >
          {node.content?.map((child, idx) => renderTiptapNode(child, idx))}
        </blockquote>
      );

    case 'codeBlock': {
      const language = (node.attrs?.language as string) || '';
      const code = node.content?.map(child => child.text || '').join('') || '';
      return <CodeBlockRenderer key={key} code={code} language={language} />;
    }

    case 'horizontalRule':
      return <hr key={key} className="my-8 border-t border-border" />;

    case 'image': {
      const src = (node.attrs?.src as string) || '';
      const alt = (node.attrs?.alt as string) || 'صورة المقال';
      const title = (node.attrs?.title as string) || '';

      if (!src) return null;

      return (
        <figure key={key} className="my-8 space-y-2 text-center">
          <img
            src={src}
            alt={alt}
            className="w-full max-h-[500px] object-cover rounded-2xl border border-border shadow-card"
            loading="lazy"
          />
          {title && <figcaption className="text-xs text-foreground-muted">{title}</figcaption>}
        </figure>
      );
    }

    case 'hardBreak':
      return <br key={key} />;

    case 'text':
      return renderTextNode(node, key);

    default:
      if (node.content && node.content.length > 0) {
        return (
          <div key={key}>
            {node.content.map((child, idx) => renderTiptapNode(child, idx))}
          </div>
        );
      }
      return null;
  }
}

export function TiptapRenderer({ content, className }: TiptapRendererProps) {
  if (!content) {
    return <p className="text-foreground-muted">لا يوجد محتوى لعرضه.</p>;
  }

  // If content is already a structured JSON object
  if (typeof content === 'object') {
    const docNode = content as unknown as TiptapNode;
    return (
      <article className={cn('max-w-none text-right', className)}>
        {renderTiptapNode(docNode, 'root-doc')}
      </article>
    );
  }

  // If content is a JSON string, attempt to parse
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content) as TiptapNode;
      if (parsed && typeof parsed === 'object' && parsed.type) {
        return (
          <article className={cn('max-w-none text-right', className)}>
            {renderTiptapNode(parsed, 'root-doc')}
          </article>
        );
      }
    } catch {
      // Fallback if plain text string
    }

    return (
      <article className={cn('space-y-4 text-base sm:text-lg leading-relaxed text-foreground-secondary', className)}>
        {content.split('\n\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </article>
    );
  }

  return null;
}
