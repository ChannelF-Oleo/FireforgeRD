// src/types/index.ts

// 1. Definimos las categorías permitidas (incluyendo 'technical')
export type ServiceCategory =
  | "web"
  | "ecommerce"
  | "saas"
  | "automation"
  | "technical";

// 2. Definimos la estructura del Plan
export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  // Cambiamos a 'string' para permitir "RD$", "RD$ / Hora" o "USD"
  currency: string;
  category: ServiceCategory;
  idealFor: string;
  deliveryTime: string;
  isRecommended?: boolean;
  features: string[];
}

// 3. Definimos la estructura del Catálogo completo
export interface ServiceCatalog {
  web: {
    laChispa: ServicePlan;
    laFragua: ServicePlan;
    acero: ServicePlan;
    hierroForjado: ServicePlan;
  };
  ecommerce: {
    tiendaStart: ServicePlan;
    ecommercePro: ServicePlan;
    marketplace: ServicePlan;
  };
  saas: {
    agendaSimple: ServicePlan;
    gestionPro: ServicePlan;
    sistemaAdministrativo: ServicePlan;
  };
  automation: {
    elPortero: ServicePlan;
    botCaptador: ServicePlan;
    neuroBot: ServicePlan;
  };
  // Agregamos la sección técnica
  technical: {
    emailCorp: ServicePlan;
    vCard: ServicePlan;
    identidad: ServicePlan;
    copy: ServicePlan;
    rescate: ServicePlan;
  };
}

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  description: string;
  icon: string;
  services: ServicePlan[];
}

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
    features: [
      "Landing Page única",
      "Next.js estático",
      "Dominio gratis por un año",
      "Hosting SSL incluido",
      "Diseño responsive",
      "Mantenimiento: USD $10",
    ],
  },
  {
    id: "la-fragua",
    name: "La Fragua",
    price: 250,
    currency: "USD",
    category: "web",
    idealFor: "Pymes, Consultoras, Abogados",
    deliveryTime: "7-10 días",
    features: [
      "Hasta 5 secciones",
      "Dominio .COM (1 año)",
      "Hosting SSL",
      "Google Maps integrado",
      "SEO Básico optimizado",
      "Mantenimiento: USD $20",
    ],
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
    features: [
      "Correos Corporativos",
      "Dominio .COM (1 año)",
      "Base de datos",
      "Auto-respuesta (Resend)",
      "Diseño interactivo",
      "Formularios avanzados",
      "Mantenimiento: USD $25",
    ],
  },
  {
    id: "hierro-forjado",
    name: "Hierro Forjado",
    price: 600,
    currency: "USD",
    category: "web",
    idealFor: "Periódicos, Catálogos",
    deliveryTime: "15-20 días",
    features: [
      "Panel Autogestionable (CMS)",
      "Dominio .COM (1 año)",
      "SEO Avanzado",
      "Capacitación incluida",
      "Next.js + Headless CMS",
      "Múltiples usuarios",
      "Mantenimiento: USD $40",
    ],
  },
];

// E-commerce Services
export const ecommerceServices: ServicePlan[] = [
  {
    id: "tienda-start",
    name: "Tienda Start",
    price: 550,
    currency: "USD",
    category: "ecommerce",
    idealFor: "Ropa, Accesorios, Productos Digitales",
    deliveryTime: "15-20 días",
    features: [
      "PayPal/Stripe integrado",
      "Guest Checkout",
      "Panel de productos",
      "Notificaciones de venta",
      "Inventario básico",
      "Mantenimiento: USD $25",
    ],
  },
  {
    id: "ecommerce-pro",
    name: "E-Commerce Pro",
    price: 1100,
    currency: "USD",
    category: "ecommerce",
    idealFor: "Tiendas Establecidas",
    deliveryTime: "20-30 días",
    isRecommended: true,
    features: [
      "Login de Clientes",
      "Historial de pedidos",
      "Mantenimiento: USD $40",
      "Pagos Locales (Azul/Cardnet)",
      "Sistema de cupones",
      "Lista de deseos (Wishlist)",
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    price: 1900,
    currency: "USD",
    category: "ecommerce",
    idealFor: "B2B, Mayoristas",
    deliveryTime: "30-45 días",
    features: [
      "Multi-vendedor",
      "Mantenimiento: USD $90",
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
    price: 400,
    currency: "USD",
    category: "saas",
    idealFor: "Booking y Reservas",
    deliveryTime: "15-20 días",
    features: [
      "Setup: USD $400",
      "Mensual: USD $35",
      "Reserva online",
      "Bloqueo automático",
      "Notificaciones SMS/Email",
    ],
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
    features: [
      "Setup: USD $670",
      "Mensual: USD $50",
      "Expediente de clientes",
      "Historial de visitas",
      "Recordatorios automáticos 24h",
    ],
  },
  {
    id: "sistema-administrativo",
    name: "Sistema Administrativo",
    price: 1500,
    currency: "USD",
    category: "saas",
    idealFor: "Full ERP",
    deliveryTime: "45-60 días",
    features: [
      "Setup: USD $1,500",
      "Mensual: USD $80",
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
    price: 150, // Setup fee
    currency: "USD",
    category: "automation",
    idealFor: "Menú Digital & FAQ",
    deliveryTime: "5-7 días",
    features: [
      "Setup: USD $150 (Pago Único)",
      "Mantenimiento: USD $25/mes", // Agregado
      "Chatbot de reglas",
      "Menú de botones interactivo",
      "Soporte Tecnico", // Justificación del pago mensual
    ],
  },
  {
    id: "bot-captador",
    name: "Bot Captador",
    price: 300, // Setup fee
    currency: "USD",
    category: "automation",
    idealFor: "CRM Automatizado",
    deliveryTime: "7-10 días",
    isRecommended: true,
    features: [
      "Setup: USD $300 (Pago Único)",
      "Soporte: USD $50/mes", // Agregado
      "Cualificación y Filtro de Leads",
      "Conexión a Notion/Sheets/Google",
      "Reporte mensual de conversaciones", // Valor agregado mensual
    ],
  },
  {
    id: "neuro-bot",
    name: "Neuro-Bot IA",
    price: 600, // Setup fee
    currency: "USD",
    category: "automation",
    idealFor: "Atención al Cliente Inteligente",
    deliveryTime: "10-15 días",
    features: [
      "Setup: USD $600 (Pago Único)",
      "Fee Mensual: Desde USD $80*", // Asterisco por consumo de tokens
      "Conexión AI (GPT-4o / Gemini)",
      "Manejo de objeciones natural",
      "Conversaciones inteligentes",
      "Entrenamiento con PDFs del negocio",
      "Gestión de costos y Mantenimiento", // Tú manejas la tarjeta de crédito de OpenAI
    ],
  },
];

// ... (Existing code from webServices, ecommerceServices, saasServices, automationServices) ...

// 5.5 Complementary Technical Services
// Servicios Técnicos Complementarios - Servicios puntuales y mantenimiento
export const technicalServices: ServicePlan[] = [
  {
    id: "email-corporativo",
    name: "Email Corporativo",
    price: 40,
    currency: "USD",
    category: "technical",
    idealFor: "Profesionales, Nuevos Negocios",
    deliveryTime: "24-48 horas",
    features: [
      "Configuración DNS/MX",
      "Alta en servidor",
      "Validación SPF/DKIM",
      "Pruebas de entregabilidad",
    ],
  },
  {
    id: "vcard-digital",
    name: "vCard Digital",
    price: 55,
    currency: "USD",
    category: "technical",
    idealFor: "Networking, Ventas",
    deliveryTime: "3-5 días",
    features: [
      "Landing Page mini (Perfil)",
      "Código QR personalizado",
      "Botón 'Guardar Contacto' (vcf)",
      "Iconos de Redes Sociales",
      "Foto de perfil optimizada",
    ],
  },
  {
    id: "identidad-tecnica",
    name: "Identidad Técnica",
    price: 35,
    currency: "USD",
    category: "technical",
    idealFor: "Marca Personal",
    deliveryTime: "24 horas",
    features: [
      "Configuración Gravatar Global",
      "Firma HTML para correos",
      "Unificación de avatares",
      "Asesoría de imagen digital",
    ],
  },
  {
    id: "copywriting-seo",
    name: "Copywriting SEO",
    price: 40,
    currency: "USD",
    category: "technical",
    idealFor: "Blogs, Landing Pages",
    deliveryTime: "3-5 días",
    features: [
      "Redacción por sección (600 palabras)",
      "Investigación de Palabras Clave",
      "Estructura H1, H2, H3",
      "Meta Títulos y Descripciones",
      "Optimización para lectura web",
    ],
  },
  {
    id: "mantenimiento-rescate",
    name: "Mantenimiento/Rescate",
    price: 40,
    currency: "USD / Hora", // Adjusted to reflect hourly nature
    category: "technical",
    idealFor: "Sitios Hackeados, Bugs",
    deliveryTime: "Inmediato / Urgente",
    features: [
      "Limpieza de Virus/Malware",
      "Actualización de Plugins/Core",
      "Corrección de errores críticos",
      "Restauración de copias de seguridad",
      "Diagnóstico de seguridad",
    ],
  },
];

// ... (Update existing exports below) ...

// Service Catalog Update
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
  // Added Technical Services to Catalog
  technical: {
    emailCorp: technicalServices[0],
    vCard: technicalServices[1],
    identidad: technicalServices[2],
    copy: technicalServices[3],
    rescate: technicalServices[4],
  },
};

// All services combined Update
export const allServices = [
  ...webServices,
  ...ecommerceServices,
  ...saasServices,
  ...automationServices,
  ...technicalServices, // Included here
];

// Service categories Update
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
  // Added Technical Category
  {
    id: "technical",
    name: "Servicios Técnicos",
    description: "Soluciones puntuales, mantenimiento y optimización",
    icon: "🛠️",
    services: technicalServices,
  },
] as const;