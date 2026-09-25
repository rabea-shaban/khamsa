'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Quote } from 'lucide-react';
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

export interface TocItem {
  id: string;
  title: string;
  level?: number;
}

export interface TiptapRendererProps {
  content: Record<string, unknown> | string;
  tocItems?: TocItem[];
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
    <div className="relative my-6 rounded-2xl border border-border bg-[#080b11] overflow-hidden group shadow-card">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border/80 text-xs font-mono text-foreground-muted select-none">
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
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-sans text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
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
              <span className="text-[11px] font-medium">نسخ الكود</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono leading-relaxed text-slate-100 overflow-x-auto text-left dir-ltr selection:bg-primary/30">
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
              className="px-2 py-0.5 rounded-md bg-surface text-primary border border-border/80 font-mono text-xs sm:text-sm dir-ltr inline-block mx-1 font-semibold"
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
              className="text-primary font-bold underline underline-offset-4 hover:text-primary-hover transition-colors"
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
        <div key={key} className="space-y-4">
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
          className="my-6 border-r-4 border-primary bg-surface/70 p-4 sm:p-5 rounded-l-2xl text-foreground-secondary italic text-base leading-relaxed"
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

// --------------------------------------------------------------------------
// Markdown Parsing & Rendering Engine
// --------------------------------------------------------------------------

function renderInlineMarkdown(text: string, keyPrefix = 'inline'): React.ReactNode {
  if (!text) return null;

  // Regex matches:
  // 1 & 2 & 3: Image: ![alt](url)
  // 4 & 5 & 6: Link: [label](url)
  // 7 & 8: Inline code: `code`
  // 9 & 10: Bold: **bold**
  // 11 & 12: Italic: *italic*
  const regex = /(!\[(.*?)\]\((.*?)\))|(\[(.*?)\]\((.*?)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let elementIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <React.Fragment key={`${keyPrefix}-txt-${elementIdx++}`}>
          {text.substring(lastIndex, match.index)}
        </React.Fragment>
      );
    }

    if (match[1]) {
      // Image: ![alt](url)
      const alt = match[2] || '';
      const src = match[3] || '';
      elements.push(
        <figure key={`${keyPrefix}-img-${elementIdx++}`} className="my-6 space-y-2 text-center">
          <img
            src={src}
            alt={alt}
            className="w-full max-h-[500px] object-cover rounded-2xl border border-border shadow-card"
            loading="lazy"
          />
          {alt && <figcaption className="text-xs text-foreground-muted">{alt}</figcaption>}
        </figure>
      );
    } else if (match[4]) {
      // Link: [label](url)
      const label = match[5];
      const url = match[6];
      const isInternal = url.startsWith('/') || url.startsWith('#');
      if (isInternal) {
        elements.push(
          <Link
            key={`${keyPrefix}-lnk-${elementIdx++}`}
            href={url}
            className="text-primary font-bold underline underline-offset-4 hover:text-primary-hover transition-colors mx-0.5"
          >
            {label}
          </Link>
        );
      } else {
        elements.push(
          <a
            key={`${keyPrefix}-lnk-${elementIdx++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold underline underline-offset-4 hover:text-primary-hover transition-colors mx-0.5"
          >
            {label}
          </a>
        );
      }
    } else if (match[7]) {
      // Code: `code`
      const codeText = match[8];
      elements.push(
        <code
          key={`${keyPrefix}-code-${elementIdx++}`}
          className="px-2 py-0.5 rounded-md bg-surface text-primary border border-border/80 font-mono text-xs sm:text-sm dir-ltr inline-block mx-1 font-semibold"
        >
          {codeText}
        </code>
      );
    } else if (match[9]) {
      // Bold: **bold**
      const boldText = match[10];
      elements.push(
        <strong key={`${keyPrefix}-bld-${elementIdx++}`} className="font-bold text-foreground mx-0.5">
          {boldText}
        </strong>
      );
    } else if (match[11]) {
      // Italic: *italic*
      const italicText = match[12];
      elements.push(
        <em key={`${keyPrefix}-it-${elementIdx++}`} className="italic text-foreground-secondary mx-0.5">
          {italicText}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(
      <React.Fragment key={`${keyPrefix}-txt-${elementIdx++}`}>
        {text.substring(lastIndex)}
      </React.Fragment>
    );
  }

  return <>{elements}</>;
}

interface MarkdownBlock {
  type: 'heading' | 'code' | 'table' | 'blockquote' | 'unorderedList' | 'orderedList' | 'hr' | 'paragraph';
  level?: number;
  text?: string;
  code?: string;
  language?: string;
  headers?: string[];
  rows?: string[][];
  items?: string[];
  id?: string;
}

function normalizeTitleForMatch(title: string): string {
  return title
    .replace(/[^\w\u0600-\u06FF]/g, '')
    .toLowerCase()
    .trim();
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*#_[\]()]/g, '')
    .replace(/[^\w\u0600-\u06FF]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseMarkdownToBlocks(rawContent: string, tocItems?: TocItem[]): MarkdownBlock[] {
  let content = rawContent.trim();

  // Strip wrapping JSON quotes or escaped backticks if present
  if (content.startsWith('"') && content.endsWith('"')) {
    try {
      content = JSON.parse(content);
    } catch {
      content = content.slice(1, -1);
    }
  }
  content = content.replace(/^`+\s*/, '').replace(/\s*`+$/, '');

  const lines = content.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  let i = 0;
  let tocHeadingIndex = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Code block (```lang)
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // consume closing ```
      blocks.push({
        type: 'code',
        code: codeLines.join('\n'),
        language,
      });
      continue;
    }

    // 3. Horizontal Rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // 4. Heading (# H1, ## H2, ### H3, #### H4)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();

      let headingId = '';
      if (tocItems && tocItems.length > 0) {
        // Try matching by normalized title text
        const normHeading = normalizeTitleForMatch(headingText);
        const matchedToc = tocItems.find(
          t => normalizeTitleForMatch(t.title) === normHeading || normHeading.includes(normalizeTitleForMatch(t.title)) || normalizeTitleForMatch(t.title).includes(normHeading)
        );
        if (matchedToc) {
          headingId = matchedToc.id;
        } else if (level === 2 && tocHeadingIndex < tocItems.length) {
          // If level 2 and sequential fallback
          headingId = tocItems[tocHeadingIndex]?.id || slugifyHeading(headingText);
        } else {
          headingId = slugifyHeading(headingText);
        }
        if (level === 2) {
          tocHeadingIndex++;
        }
      } else {
        headingId = slugifyHeading(headingText);
      }

      blocks.push({
        type: 'heading',
        level,
        text: headingText,
        id: headingId,
      });
      i++;
      continue;
    }

    // 5. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        text: quoteLines.join('\n'),
      });
      continue;
    }

    // 6. Table (| Col 1 | Col 2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const headers = trimmed.split('|').slice(1, -1).map(c => c.trim());
      i += 2; // skip header and separator row
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const rowCells = lines[i].trim().split('|').slice(1, -1).map(c => c.trim());
        rows.push(rowCells);
        i++;
      }
      blocks.push({
        type: 'table',
        headers,
        rows,
      });
      continue;
    }

    // 7. Unordered List (* item or - item)
    if (/^[*-]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[*-]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[*-]\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'unorderedList',
        items,
      });
      continue;
    }

    // 8. Ordered List (1. item, 2. item)
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'orderedList',
        items,
      });
      continue;
    }

    // 9. Otherwise, Paragraph (accumulate until empty line or new block)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !/^[*-]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim()) &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---'))
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: paraLines.join(' '),
      });
    }
  }

  return blocks;
}

function renderMarkdownBlock(block: MarkdownBlock, index: number): React.ReactNode {
  switch (block.type) {
    case 'heading': {
      const level = block.level || 2;
      const text = block.text || '';
      const id = block.id;

      switch (level) {
        case 1:
          return (
            <h1
              key={index}
              id={id}
              className="text-2xl sm:text-4xl font-black text-foreground mt-10 mb-4 tracking-tight leading-tight scroll-mt-24"
            >
              {renderInlineMarkdown(text, `h1-${index}`)}
            </h1>
          );
        case 2:
          return (
            <h2
              key={index}
              id={id}
              className="text-xl sm:text-2xl font-extrabold text-foreground mt-10 mb-4 border-r-4 border-primary pr-3.5 tracking-tight leading-snug scroll-mt-24 flex items-center justify-between group"
            >
              <span>{renderInlineMarkdown(text, `h2-${index}`)}</span>
              {id && (
                <a
                  href={`#${id}`}
                  className="opacity-0 group-hover:opacity-100 text-foreground-muted hover:text-primary transition-opacity text-sm mr-2"
                  aria-label="رابط مباشر للفقرة"
                >
                  #
                </a>
              )}
            </h2>
          );
        case 3:
          return (
            <h3
              key={index}
              id={id}
              className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-3 tracking-tight leading-snug scroll-mt-24"
            >
              {renderInlineMarkdown(text, `h3-${index}`)}
            </h3>
          );
        case 4:
          return (
            <h4
              key={index}
              id={id}
              className="text-base sm:text-lg font-bold text-foreground mt-6 mb-2 scroll-mt-24"
            >
              {renderInlineMarkdown(text, `h4-${index}`)}
            </h4>
          );
        default:
          return (
            <h5
              key={index}
              id={id}
              className="text-sm sm:text-base font-bold text-foreground mt-4 mb-2 scroll-mt-24"
            >
              {renderInlineMarkdown(text, `h5-${index}`)}
            </h5>
          );
      }
    }

    case 'code':
      return (
        <CodeBlockRenderer
          key={index}
          code={block.code || ''}
          language={block.language || 'code'}
        />
      );

    case 'table':
      return (
        <div
          key={index}
          className="overflow-x-auto my-6 rounded-2xl border border-border bg-surface/40 shadow-card"
        >
          <table className="w-full text-right text-sm border-collapse">
            {block.headers && block.headers.length > 0 && (
              <thead>
                <tr className="bg-surface border-b border-border text-foreground font-bold">
                  {block.headers.map((h, hIdx) => (
                    <th key={hIdx} className="py-3 px-4 text-xs sm:text-sm">
                      {renderInlineMarkdown(h, `th-${index}-${hIdx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows?.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors"
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="py-3 px-4 text-xs sm:text-sm text-foreground-secondary leading-relaxed"
                    >
                      {renderInlineMarkdown(cell, `td-${index}-${rIdx}-${cIdx}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'blockquote':
      return (
        <blockquote
          key={index}
          className="my-6 border-r-4 border-primary bg-surface/70 p-4 sm:p-5 rounded-l-2xl text-foreground-secondary italic text-base sm:text-lg leading-relaxed shadow-sm flex items-start gap-3"
        >
          <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1 rotate-180 opacity-60" />
          <div className="flex-1 not-italic">
            {renderInlineMarkdown(block.text || '', `bq-${index}`)}
          </div>
        </blockquote>
      );

    case 'unorderedList':
      return (
        <ul key={index} className="space-y-2.5 my-4 pr-2 list-none">
          {block.items?.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="flex items-start gap-2.5 text-base sm:text-lg leading-relaxed text-foreground-secondary"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
              <div className="flex-1">
                {renderInlineMarkdown(item, `ul-${index}-${itemIdx}`)}
              </div>
            </li>
          ))}
        </ul>
      );

    case 'orderedList':
      return (
        <ol key={index} className="space-y-2.5 my-4 pr-2 list-none">
          {block.items?.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="flex items-start gap-3 text-base sm:text-lg leading-relaxed text-foreground-secondary"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold font-mono mt-1 flex-shrink-0 border border-primary/20">
                {itemIdx + 1}
              </span>
              <div className="flex-1">
                {renderInlineMarkdown(item, `ol-${index}-${itemIdx}`)}
              </div>
            </li>
          ))}
        </ol>
      );

    case 'hr':
      return <hr key={index} className="my-8 border-t border-border" />;

    case 'paragraph':
      return (
        <p
          key={index}
          className="text-base sm:text-lg leading-relaxed text-foreground-secondary mb-4"
        >
          {renderInlineMarkdown(block.text || '', `p-${index}`)}
        </p>
      );

    default:
      return null;
  }
}

export function TiptapRenderer({ content, tocItems, className }: TiptapRendererProps) {
  if (!content) {
    return <p className="text-foreground-muted">لا يوجد محتوى لعرضه.</p>;
  }

  // 1. If content is already a structured Tiptap JSON object
  if (typeof content === 'object') {
    const docNode = content as unknown as TiptapNode;
    return (
      <article className={cn('max-w-none text-right space-y-2', className)}>
        {renderTiptapNode(docNode, 'root-doc')}
      </article>
    );
  }

  // 2. If content is a JSON string or Markdown string
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content) as TiptapNode;
      if (parsed && typeof parsed === 'object' && parsed.type === 'doc') {
        return (
          <article className={cn('max-w-none text-right space-y-2', className)}>
            {renderTiptapNode(parsed, 'root-doc')}
          </article>
        );
      }
    } catch {
      // Not a Tiptap JSON, continue to Markdown parsing
    }

    // Robust Markdown rendering
    const blocks = parseMarkdownToBlocks(content, tocItems);
    return (
      <article className={cn('max-w-none text-right space-y-2', className)}>
        {blocks.map((block, idx) => renderMarkdownBlock(block, idx))}
      </article>
    );
  }

  return null;
}
