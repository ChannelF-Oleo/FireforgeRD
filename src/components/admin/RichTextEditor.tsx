"use client";

import { useCallback } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link,
  Image,
  Minus,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const insertMarkdown = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const textarea = document.getElementById(
        "markdown-editor",
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end) || placeholder;

      const newValue =
        value.substring(0, start) +
        before +
        selectedText +
        after +
        value.substring(end);

      onChange(newValue);

      // Restaurar foco y selección
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + selectedText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [value, onChange],
  );

  const tools = [
    {
      icon: Bold,
      action: () => insertMarkdown("**", "**", "texto en negrita"),
      title: "Negrita",
    },
    {
      icon: Italic,
      action: () => insertMarkdown("*", "*", "texto en cursiva"),
      title: "Cursiva",
    },
    { type: "divider" },
    {
      icon: Heading2,
      action: () => insertMarkdown("\n## ", "\n", "Título"),
      title: "Título H2",
    },
    {
      icon: Heading3,
      action: () => insertMarkdown("\n### ", "\n", "Subtítulo"),
      title: "Título H3",
    },
    { type: "divider" },
    {
      icon: List,
      action: () => insertMarkdown("\n- ", "", "elemento de lista"),
      title: "Lista",
    },
    {
      icon: ListOrdered,
      action: () => insertMarkdown("\n1. ", "", "elemento numerado"),
      title: "Lista numerada",
    },
    { type: "divider" },
    {
      icon: Quote,
      action: () => insertMarkdown("\n> ", "\n", "cita"),
      title: "Cita",
    },
    {
      icon: Code,
      action: () => insertMarkdown("`", "`", "código"),
      title: "Código inline",
    },
    {
      icon: Minus,
      action: () => insertMarkdown("\n\n---\n\n", "", ""),
      title: "Separador",
    },
    { type: "divider" },
    {
      icon: Link,
      action: () => insertMarkdown("[", "](url)", "texto del enlace"),
      title: "Enlace",
    },
    {
      icon: Image,
      action: () => insertMarkdown("![", "](url)", "descripción"),
      title: "Imagen",
    },
  ];

  return (
    <div className="border border-[#1A1818]/10 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-[#F9F8F6] border-b border-[#1A1818]/10">
        {tools.map((tool, index) =>
          tool.type === "divider" ? (
            <div
              key={index}
              className="w-px h-6 bg-[#1A1818]/10 mx-1 hidden sm:block"
            />
          ) : (
            <button
              key={index}
              type="button"
              onClick={tool.action}
              title={tool.title}
              className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-[#6F6B65] hover:text-[#1A1818]"
            >
              {tool.icon && <tool.icon className="w-4 h-4" />}
            </button>
          ),
        )}
      </div>

      {/* Editor */}
      <textarea
        id="markdown-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[300px] sm:min-h-[400px] p-4 outline-none resize-y font-mono text-sm leading-relaxed"
      />

      {/* Help text */}
      <div className="px-4 py-2 bg-[#F9F8F6] border-t border-[#1A1818]/10 text-xs text-[#9C9890]">
        Usa Markdown: **negrita**, *cursiva*, ## título, - lista, [enlace](url)
      </div>
    </div>
  );
}
