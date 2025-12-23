import { ServicePlan, ServiceCatalog } from "@/types";

// Web Services
export const webServices: ServicePlan[] = [
  {
    id: "la-chispa",
    name: "La Chispa",
    price: 10000,
    currency: "RD$",
    category: "web",
    idealFor: "Marcas Personales, Link-in-bio",
    deliveryTime: "5-7 días",
    features: [
      "Landing Page única",
      "Next.js estático",
      "Dominio gratis por un año",
      "Hosting SSL incluido",
      "Diseño responsive",
    ],
  },
  {
    id: "la-fragua",
    name: "La Fragua",
    price: 15500,
    currency: "RD$",
    category: "web",
    idealFor: "Pymes, Consultoras, Abogados",
    deliveryTime: "7-10 días",
    features: [
      "Hasta 5 secciones",
      "Dominio .COM (1 año)",
      "Hosting SSL",
      "Google Maps integrado",
      "SEO Básico optimizado",
    ],
  },
  {
    id: "acero",
    name: "Acero",
    price: 25500,
    currency: "RD$",
    category: "web",
    idealFor: "Inmobiliarias, Seguros",
    deliveryTime: "10-15 días",
    isRecommended: true,
    features: [
      "Correos Corporativos",
      "Base de datos",
      "Auto-respuesta (Resend)",
      "Diseño interactivo",
      "Formularios avanzados",
    ],
  },
  {
    id: "hierro-forjado",
    name: "Hierro Forjado",
    price: 37000,
    currency: "RD$",
    category: "web",
    idealFor: "Periódicos, Catálogos",
    deliveryTime: "15-20 días",
    features: [
      "Panel Autogestionable (CMS)",
      "SEO Avanzado",
      "Capacitación incluida",
      "Next.js + Headless CMS",
      "Múltiples usuarios",
    ],
  },
];

// E-commerce Services
export const ecommerceServices: ServicePlan[] = [
  {
    id: "tienda-start",
    name: "Tienda Start",
    price: 35000,
    currency: "RD$",
    category: "ecommerce",
    idealFor: "Ropa, Accesorios, Productos Digitales",
    deliveryTime: "15-20 días",
    features: [
      "PayPal/Stripe integrado",
      "Guest Checkout",
      "Panel de productos",
      "Notificaciones de venta",
      "Inventario básico",
    ],
  },
  {
    id: "ecommerce-pro",
    name: "E-Commerce Pro",
    price: 70000,
    currency: "RD$",
    category: "ecommerce",
    idealFor: "Tiendas Establecidas",
    deliveryTime: "20-30 días",
    isRecommended: true,
    features: [
      "Login de Clientes",
      "Historial de pedidos",
      "Pagos Locales (Azul/Cardnet)",
      "Sistema de cupones",
      "Lista de deseos (Wishlist)",
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    price: 120000,
    currency: "RD$",
    category: "ecommerce",
    idealFor: "B2B, Mayoristas",
    deliveryTime: "30-45 días",
    features: [
      "Multi-vendedor",
      "Precios dinámicos (Mayorista/Detalle)",
      "Lógica de envíos compleja",
      "Integración ERP",
      "Dashboard avanzado",
    ],
  },
];

// SaaS Services
export const saasServices: ServicePlan[] = [
  {
    id: "agenda-simple",
    name: "Agenda Simple",
    price: 25000,
    currency: "RD$",
    category: "saas",
    idealFor: "Booking y Reservas",
    deliveryTime: "15-20 días",
    features: [
      "Setup: RD$ 25,000",
      "Mensual: RD$ 2,000",
      "Reserva online",
      "Bloqueo automático",
      "Notificaciones SMS/Email",
    ],
  },
  {
    id: "gestion-pro",
    name: "Gestión Pro",
    price: 42500,
    currency: "RD$",
    category: "saas",
    idealFor: "Agenda + CRM",
    deliveryTime: "20-30 días",
    isRecommended: true,
    features: [
      "Setup: RD$ 42,500",
      "Mensual: RD$ 3,000",
      "Expediente de clientes",
      "Historial de visitas",
      "Recordatorios automáticos 24h",
    ],
  },
  {
    id: "sistema-administrativo",
    name: "Sistema Administrativo",
    price: 95000,
    currency: "RD$",
    category: "saas",
    idealFor: "Full ERP",
    deliveryTime: "45-60 días",
    features: [
      "Setup: RD$ 95,000",
      "Mensual: RD$ 5,000",
      "Multiusuario/Roles",
      "Caja chica",
      "Reportes avanzados",
    ],
  },
];

// Automation Services
// Automation Services - OPTIMIZADO: Modelo Híbrido (Setup + Recurrencia)
export const automationServices: ServicePlan[] = [
  {
    id: "el-portero",
    name: "El Portero",
    price: 9500, // Setup fee
    currency: "RD$",
    category: "automation",
    idealFor: "Menú Digital & FAQ",
    deliveryTime: "5-7 días",
    features: [
      "Setup: RD$ 9,500 (Pago Único)",
      "Mantenimiento: RD$ 1,500/mes", // Agregado
      "Chatbot de reglas",
      "Menú de botones interactivo",
      "Soporte Tecnico", // Justificación del pago mensual
    ],
  },
  {
    id: "bot-captador",
    name: "Bot Captador",
    price: 18500, // Setup fee
    currency: "RD$",
    category: "automation",
    idealFor: "CRM Automatizado",
    deliveryTime: "7-10 días",
    isRecommended: true,
    features: [
      "Setup: RD$ 18,500 (Pago Único)",
      "Soporte: RD$ 3,000/mes", // Agregado
      "Cualificación y Filtro de Leads",
      "Conexión a Notion/Sheets/Google",
      "Reporte mensual de conversaciones", // Valor agregado mensual
    ],
  },
  {
    id: "neuro-bot",
    name: "Neuro-Bot IA",
    price: 35000, // Setup fee
    currency: "RD$",
    category: "automation",
    idealFor: "Atención al Cliente Inteligente",
    deliveryTime: "10-15 días",
    features: [
      "Setup: RD$ 35,000 (Pago Único)",
      "Fee Mensual: Desde RD$ 5,000*", // Asterisco por consumo de tokens
      "Conexión AI (GPT-4o / Gemini)",
      "Manejo de objeciones natural",
      "Conversaciones inteligentes",
      "Entrenamiento con PDFs del negocio",
      "Gestión de costos y Mantenimiento", // Tú manejas la tarjeta de crédito de OpenAI
    ],
  },
];

// Service Catalog
export const serviceCatalog: ServiceCatalog = {
  web: {
    laChispa: webServices[0],
    laFragua: webServices[1],
    acero: webServices[2],
    hierroForjado: webServices[3],
  },
  ecommerce: {
    tiendaStart: ecommerceServices[0],
    ecommercePro: ecommerceServices[1],
    marketplace: ecommerceServices[2],
  },
  saas: {
    agendaSimple: saasServices[0],
    gestionPro: saasServices[1],
    sistemaAdministrativo: saasServices[2],
  },
  automation: {
    elPortero: automationServices[0],
    botCaptador: automationServices[1],
    neuroBot: automationServices[2],
  },
};

// All services combined
export const allServices = [
  ...webServices,
  ...ecommerceServices,
  ...saasServices,
  ...automationServices,
];

// Service categories
export const serviceCategories = [
  {
    id: "web",
    name: "Desarrollo Web",
    description: "Sitios web corporativos y landing pages de alto rendimiento",
    icon: "🌐",
    services: webServices,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Tiendas online con pasarelas de pago seguras",
    icon: "🛒",
    services: ecommerceServices,
  },
  {
    id: "saas",
    name: "Sistemas SaaS",
    description: "Software a medida para gestión empresarial",
    icon: "⚙️",
    services: saasServices,
  },
  {
    id: "automation",
    name: "Automatización",
    description: "Chatbots y automatización con IA",
    icon: "🤖",
    services: automationServices,
  },
] as const;
