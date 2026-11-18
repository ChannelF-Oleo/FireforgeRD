"use client";

import { useMemo } from "react";
import { marked } from "marked";

interface SafeMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Renderiza el contenido de un artículo (Markdown o HTML del editor).
 *
 * Se procesa igual en servidor y cliente (marked es determinista). Antes el
 * servidor mandaba el Markdown crudo con <br> y se convertía al hidratar: el
 * HTML que leía Google no tenía los subtítulos del artículo.
 */
export function SafeMarkdown({ content, className = "" }: SafeMarkdownProps) {
  const htmlContent = useMemo(() => {
    // Detectar si ya tiene formato HTML
    const hasHtml = /<[a-z][\s\S]*>/i.test(content.trim());

    if (hasHtml) {
      return content;
    }

    // Usar la nueva API de marked (v5+)
    try {
      return marked.parse(content, {
        breaks: true,
        gfm: true,
      }) as string;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return `<p>${content.replace(/\n/g, '<br>')}</p>`;
    }
  }, [content]);

  return (
    <div
      className={`blog-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning={true}
    />
  );
}