"use client";

import { useMemo, useEffect, useState } from "react";
import { marked } from "marked";

interface SafeMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Componente que renderiza Markdown de forma segura evitando hydration mismatch
 * Procesa el contenido solo en el cliente después del primer render
 */
export function SafeMarkdown({ content, className = "" }: SafeMarkdownProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const htmlContent = useMemo(() => {
    if (!isClient) {
      // En el servidor, devolver contenido plano para evitar mismatch
      return content.replace(/\n/g, '<br>');
    }

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
  }, [content, isClient]);

  return (
    <div
      className={`blog-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning={true}
    />
  );
}