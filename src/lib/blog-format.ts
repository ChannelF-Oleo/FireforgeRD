// Formato de fechas y tiempo de lectura del blog, compartido por la lista
// (BlogListUI) y el artículo (BlogPostView) para que no se desincronicen.

const dateFormat = new Intl.DateTimeFormat("es-DO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  // Zona fija: el servidor corre en UTC y el visitante en hora de RD; sin
  // esto un artículo publicado de noche mostraba otro día en cada lado y
  // la hidratación fallaba (React #418).
  timeZone: "America/Santo_Domingo",
});

export function formatPostDate(date: Date | string | null | undefined): string {
  if (!date) return "Fecha no disponible";
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return "Fecha no válida";
  return dateFormat.format(dateObj);
}

export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  return Math.ceil(content.split(/\s+/).length / wordsPerMinute);
}
