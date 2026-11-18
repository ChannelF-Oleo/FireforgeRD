// Importamos tipos desde el archivo central
import type { ServicePlan, ServiceCategory } from "@/types";

// Definimos interfaces específicas para este archivo
export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  description: string;
  services: ServicePlan[];
}

// Helper de migración: la inmensa mayoría de los features están incluidos.
// `included: false` se escribe explícito el día que se decida ese contenido.
const incluidos = (...labels: string[]) =>
  labels.map((label) => ({ label, included: true }));

// Web Services
export const webServices: ServicePlan[] = [
  {
    id: "la-chispa",
    name: "La Chispa",
    price: 160,
    currency: "USD",
    category: "web",
    idealFor: "Marcas Personales, Link-in-bio",
    deliveryTime: "5-7 días",
    recurringFee: { amount: 10, period: "mes", label: "Mantenimiento" },
    features: incluidos(
      "Landing Page única",
      "Next.js estático",
      "Dominio gratis por un año",
      "Hosting SSL incluido",
      "Diseño responsive",
    ),
  },
  {
    id: "la-fragua",
    name: "La Fragua",
    price: 250,
    currency: "USD",
    category: "web",
    idealFor: "Pymes, Consultoras, Abogados",
    deliveryTime: "7-10 días",
    recurringFee: { amount: 20, period: "mes", label: "Mantenimiento" },
    features: incluidos(
      "Hasta 5 secciones",
      "Dominio .COM (1 año)",
      "Hosting SSL",
      "Google Maps integrado",
      "SEO Básico optimizado",
    ),
  },
  {
    id: "acero",
    name: "Acero",
    price: 400,
    currency: "USD",
    category: "web",
    idealFor: "Inmobiliarias, Seguros",
    deliveryTime: "10-15 días",
    isRecommended: true,
    recurringFee: { amount: 25, period: "mes", label: "Mantenimiento" },
    features: incluidos(
      "Correos Corporativos",
      "Dominio .COM (1 año)",
      "Base de datos",
      "Auto-respuesta (Resend)",
      "Diseño interactivo",
      "Formularios avanzados",
    ),
  },
  {
    id: "hierro-forjado",
    name: "Hierro Forjado",
    price: 600,
    currency: "USD",
    category: "web",
    idealFor: "Periódicos, Catálogos",
    deliveryTime: "15-20 días",
    recurringFee: { amount: 40, period: "mes", label: "Mantenimiento" },
    features: incluidos(
      "Panel Autogestionable (CMS)",
      "Dominio .COM (1 año)",
      "SEO Avanzado",
      "Capacitación incluida",
      "Next.js + Headless CMS",
      "Múltiples usuarios",
    ),
  },
];

// Tiendas online: viven dentro de "Desarrollo Web" (ya no son categoría
// propia). El array se conserva separado para poder referirlas por grupo.
export const ecommerceServices: ServicePlan[] = [
  {
    id: "tienda-start",
    name: "Tienda Start",
    price: 550,
    currency: "USD",
    category: "web",
    idealFor: "Ropa, Accesorios, Productos Digitales",
    deliveryTime: "15-20 días",
    recurringFee: { amount: 25, period: "mes", label: "Mantenimiento" },
    features: incluidos(
      "PayPal/Stripe integrado",
      "Guest Checkout",
      "Panel de productos",
      "Notificaciones de venta",
      "Inventario básico",
    ),
  },
  {
    id: "ecommerce-pro",
    name: "E-Commerce Pro",
    price: 1100,
    currency: "USD",
    category: "web",
    idealFor: "Tiendas Establecidas",
    deliveryTime: "20-30 días",
    isRecommended: true,
    recurringFee: { amount: 40, period: "mes", label: "Mantenimiento" },
    features: incluidos(
      "Login de Clientes",
      "Historial de pedidos",
      "Pagos Locales (Azul/Cardnet)",
      "Sistema de cupones",
      "Lista de deseos (Wishlist)",
    ),
  },
  {
    id: "marketplace",
    name: "Marketplace",
    price: 1900,
    currency: "USD",
    category: "web",
    idealFor: "B2B, Mayoristas",
    deliveryTime: "30-45 días",
    recurringFee: { amount: 90, period: "mes", label: "Mantenimiento" },
    features: incluidos(
      "Multi-vendedor",
      "Precios dinámicos (Mayorista/Detalle)",
      "Lógica de envíos compleja",
      "Integración ERP",
      "Dashboard avanzado",
    ),
  },
];

// SaaS Services
export const saasServices: ServicePlan[] = [
  {
    id: "agenda-simple",
    name: "Agenda Simple",
    price: 400,
    currency: "USD",
    category: "saas",
    idealFor: "Booking y Reservas",
    deliveryTime: "15-20 días",
    setupFee: true,
    recurringFee: { amount: 35, period: "mes" },
    features: incluidos(
      "Reserva online",
      "Bloqueo automático",
      "Notificaciones SMS/Email",
    ),
  },
  {
    id: "gestion-pro",
    name: "Gestión Pro",
    price: 670,
    currency: "USD",
    category: "saas",
    idealFor: "Agenda + CRM",
    deliveryTime: "20-30 días",
    isRecommended: true,
    setupFee: true,
    recurringFee: { amount: 50, period: "mes" },
    features: incluidos(
      "Expediente de clientes",
      "Historial de visitas",
      "Recordatorios automáticos 24h",
    ),
  },
  {
    id: "sistema-administrativo",
    name: "Sistema Administrativo",
    price: 1500,
    currency: "USD",
    category: "saas",
    idealFor: "Full ERP",
    deliveryTime: "45-60 días",
    setupFee: true,
    recurringFee: { amount: 80, period: "mes" },
    features: incluidos(
      "Multiusuario/Roles",
      "Caja chica",
      "Reportes avanzados",
    ),
  },
];

// Subservicios: trabajos puntuales, presencia digital básica y mantenimiento.
// Orden: el paquete primero y luego de lo que más vende a lo que menos.
export const subServices: ServicePlan[] = [
  {
    id: "kit-negocio-nuevo",
    name: "Kit Negocio Nuevo",
    price: 110,
    currency: "USD",
    category: "subservicios",
    idealFor: "Negocios que arrancan",
    deliveryTime: "3-5 días",
    isRecommended: true,
    features: incluidos(
      "Email Corporativo",
      "Firma HTML para correos",
      "Perfil de Google configurado",
      "WhatsApp Business configurado",
    ),
  },
  {
    // Precio propuesto, a validar. Separado: Menú QR $90 + alta delivery $150
    // + Perfil de Google $45 = $285.
    id: "kit-restaurante",
    name: "Kit Restaurante",
    price: 240,
    currency: "USD",
    category: "subservicios",
    idealFor: "Restaurantes",
    deliveryTime: "7-14 días",
    features: incluidos(
      "Menú QR con tu marca (primer año)",
      "Alta en Uber Eats y PedidosYa",
      "Perfil de Google configurado",
    ),
    // No va en features: ahí se muestra con check de "incluido".
    notes: ["La gestión mensual de delivery no está incluida: desde US$60/mes."],
  },
  {
    id: "perfil-google",
    name: "Perfil de Google",
    price: 45,
    currency: "USD",
    category: "subservicios",
    idealFor: "Negocios locales",
    deliveryTime: "3-5 días",
    features: incluidos(
      "Alta o reclamo del perfil",
      "Acompañamiento en la verificación",
      "Categorías, horarios y servicios",
      "Descripción optimizada para búsquedas",
      "Fotos optimizadas",
    ),
  },
  // Menú QR: hay competencia barata o gratis en RD, así que no se compite
  // por precio sino por diseño propio y por el panel de autogestión. El panel
  // se construye cuando el primer restaurante lo contrate.
  {
    id: "menu-qr",
    name: "Menú QR",
    price: 90,
    currency: "USD",
    category: "subservicios",
    idealFor: "Restaurantes, Cafeterías",
    deliveryTime: "5-7 días",
    recurringFee: { amount: 5, period: "mes", label: "Hosting desde el 2º año" },
    features: incluidos(
      "Diseño propio con tu marca",
      "Panel para cambiar precios tú mismo",
      "Activar y desactivar platos al momento",
      "Código QR para mesas y mostrador",
      "Hosting del primer año incluido",
    ),
  },
  // Delivery: lo que se vende no es el registro (el dueño puede hacerlo gratis)
  // sino dejar la cuenta bien armada y manejarla cada mes. Límites de cambios
  // y horario de soporte acotan la gestión para que el margen no se diluya.
  // Pendiente de confirmar antes de ofrecerlo: llevar clientes de las apps al
  // WhatsApp propio del restaurante (los términos de las apps pueden impedirlo).
  {
    id: "delivery-basico",
    name: "Delivery Apps Básico",
    price: 150,
    currency: "USD",
    category: "subservicios",
    idealFor: "Restaurantes",
    deliveryTime: "7-14 días (según aprobación de cada app)",
    setupFee: true,
    setupNote: "Alta en Uber Eats y PedidosYa",
    recurringFee: { amount: 60, period: "mes", label: "Gestión" },
    features: incluidos(
      "Menú de 12 a 18 platos con descripciones",
      "Precios calculados para cubrir la comisión",
      "Edición de fotos, horarios y tiempos de preparación",
      "Hasta 8 cambios de menú al mes",
      "Soporte hasta las 8:30 p.m. para desactivar platos y cambios urgentes",
      "Respuesta a reseñas y reporte mensual",
    ),
    notes: [
      "El contrato con cada app lo firma el restaurante con su RNC o cédula. Operamos con un usuario delegado, nunca con tu contraseña.",
      "Las comisiones por pedido las cobra cada app.",
    ],
  },
  {
    id: "delivery-pro",
    name: "Delivery Apps Pro",
    price: 150,
    currency: "USD",
    category: "subservicios",
    idealFor: "Restaurantes con volumen",
    deliveryTime: "7-14 días (según aprobación de cada app)",
    setupFee: true,
    setupNote: "Alta en Uber Eats y PedidosYa",
    recurringFee: { amount: 120, period: "mes", label: "Gestión" },
    features: incluidos(
      "Todo lo de Delivery Apps Básico",
      "Hasta 20 cambios de menú al mes",
      "Promociones y publicidad dentro de las apps",
      "Reporte semanal",
    ),
    notes: [
      "La inversión en publicidad dentro de las apps la paga el restaurante, aparte de la cuota de gestión.",
      "El contrato con cada app lo firma el restaurante con su RNC o cédula. Operamos con un usuario delegado, nunca con tu contraseña.",
      "Las comisiones por pedido las cobra cada app.",
    ],
  },
  {
    id: "catalogo-whatsapp",
    name: "Catálogo WhatsApp",
    price: 90,
    currency: "USD",
    category: "subservicios",
    idealFor: "Tiendas que venden por Instagram",
    deliveryTime: "5-7 días",
    features: incluidos(
      "Catálogo digital con fotos y precios",
      "Pedido armado directo a WhatsApp",
      "Código QR para compartir",
      "Enlace para la bio de Instagram",
    ),
  },
  {
    id: "vcard-nfc",
    name: "vCard + Tarjeta NFC",
    price: 95,
    currency: "USD",
    category: "subservicios",
    idealFor: "Networking, Ventas",
    deliveryTime: "5-7 días",
    features: incluidos(
      "Todo lo de vCard Digital",
      "Tarjeta física con chip NFC",
      "Se comparte acercando el teléfono",
    ),
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    price: 30,
    currency: "USD",
    category: "subservicios",
    idealFor: "Atención a clientes",
    deliveryTime: "24-48 horas",
    features: incluidos(
      "Perfil de empresa completo",
      "Mensajes de bienvenida y ausencia",
      "Respuestas rápidas",
      "Etiquetas para organizar chats",
    ),
  },
  {
    id: "email-corporativo",
    name: "Email Corporativo",
    price: 40,
    currency: "USD",
    category: "subservicios",
    idealFor: "Profesionales, Nuevos Negocios",
    deliveryTime: "24-48 horas",
    features: incluidos(
      "Configuración DNS/MX",
      "Alta en servidor",
      "Validación SPF/DKIM",
      "Pruebas de entregabilidad",
    ),
  },
  {
    id: "vcard-digital",
    name: "vCard Digital",
    price: 55,
    currency: "USD",
    category: "subservicios",
    idealFor: "Networking, Ventas",
    deliveryTime: "3-5 días",
    features: incluidos(
      "Landing Page mini (Perfil)",
      "Código QR personalizado",
      "Botón 'Guardar Contacto' (vcf)",
      "Iconos de Redes Sociales",
      "Foto de perfil optimizada",
    ),
  },
  {
    id: "copywriting-seo",
    name: "Copywriting SEO",
    price: 40,
    currency: "USD",
    category: "subservicios",
    idealFor: "Blogs, Landing Pages",
    deliveryTime: "3-5 días",
    features: incluidos(
      "Redacción por sección (600 palabras)",
      "Investigación de Palabras Clave",
      "Estructura H1, H2, H3",
      "Meta Títulos y Descripciones",
      "Optimización para lectura web",
    ),
  },
  {
    id: "mantenimiento-rescate",
    name: "Mantenimiento/Rescate",
    price: 40,
    currency: "USD / Hora", // Adjusted to reflect hourly nature
    category: "subservicios",
    idealFor: "Sitios Hackeados, Bugs",
    deliveryTime: "Inmediato / Urgente",
    features: incluidos(
      "Limpieza de Virus/Malware",
      "Actualización de Plugins/Core",
      "Corrección de errores críticos",
      "Restauración de copias de seguridad",
      "Diagnóstico de seguridad",
    ),
  },
];

export const allServices = [
  ...webServices,
  ...ecommerceServices,
  ...saasServices,
  ...subServices,
];

export const serviceCategories = [
  {
    id: "web",
    name: "Desarrollo Web",
    description: "Sitios web, landing pages y tiendas online de alto rendimiento",
    services: [...webServices, ...ecommerceServices],
  },
  {
    id: "saas",
    name: "Sistemas SaaS",
    description: "Software a medida para gestión empresarial",
    services: saasServices,
  },
  {
    id: "subservicios",
    name: "Subservicios",
    description: "Presencia digital, soluciones puntuales y mantenimiento",
    services: subServices,
  },
] as const;
