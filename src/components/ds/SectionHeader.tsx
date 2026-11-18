import { heading } from "./ui";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id: string;
  /** h1 en páginas cuyo título principal es este encabezado. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="grid gap-4 border-t border-(--ds-fg) pt-6 md:grid-cols-12 md:gap-6">
      <p className="text-sm font-medium uppercase tracking-wider text-(--ds-muted-fg) md:col-span-3">{eyebrow}</p>
      <div className="md:col-span-9">
        <Tag id={id} className={`${heading} text-3xl font-semibold tracking-tight text-balance md:text-4xl`}>
          {title}
        </Tag>
        {intro && <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-(--ds-muted-fg)">{intro}</p>}
      </div>
    </div>
  );
}
