import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { FireMark } from "@/components/ui/fire-mark";
import { dsRoot } from "./fonts";
import { contactHref, email, instagramHref, siteNav, whatsappHref } from "./nav";
import { container, focusRing, heading } from "./ui";

const linkClass = `inline-flex min-h-11 cursor-pointer items-center gap-2 hover:text-(--ds-primary-text) ${focusRing}`;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={`${dsRoot} border-t border-(--ds-border) bg-(--ds-bg) py-12`}>
      <div className={`${container} grid gap-8 text-sm sm:grid-cols-2 md:grid-cols-12`}>
        <div className="sm:col-span-2 md:col-span-5">
          <p className={`${heading} inline-flex items-center gap-2 text-lg font-bold`}>
            <FireMark className="size-6" />
            FireforgeRD
          </p>
          <p className="mt-2 max-w-[45ch] text-(--ds-muted-fg)">
            Desarrollo web, tiendas online y software a medida. República Dominicana.
          </p>
        </div>

        <nav aria-label="Explorar" className="md:col-span-3">
          <ul>
            {[...siteNav.filter((l) => !l.href.startsWith("/#")), { href: "/#proyectos", label: "Proyectos" }, { href: contactHref, label: "Contacto" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="md:col-span-4">
          <li>
            <a href={whatsappHref} className={linkClass}>
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
          </li>
          <li>
            <a href={`mailto:${email}`} className={linkClass}>
              <Mail className="size-4" aria-hidden /> {email}
            </a>
          </li>
          <li>
            <a href={instagramHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Instagram className="size-4" aria-hidden /> Instagram
            </a>
          </li>
        </ul>

        <div className="flex flex-col gap-2 border-t border-(--ds-border) pt-6 text-(--ds-muted-fg) sm:col-span-2 sm:flex-row sm:justify-between md:col-span-12">
          <p>© {year} FireforgeRD</p>
          <p className="flex gap-6">
            <Link href="/aviso-legal" className={linkClass}>Aviso legal</Link>
            <Link href="/privacidad" className={linkClass}>Privacidad</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
