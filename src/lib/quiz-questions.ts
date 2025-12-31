import type { QuizQuestion } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  // SECCIÓN 1: INFORMACIÓN DEL NEGOCIO
  {
    id: "business_type",
    question: "¿Cuál es el tipo de tu negocio?",
    type: "single",
    options: [
      {
        value: "servicios",
        label: "Servicios profesionales",
        weight: { landing: 2, sistema: 1 },
      },
      {
        value: "comercio",
        label: "Comercio / Retail",
        weight: { ecommerce: 3, landing: 1 },
      },
      {
        value: "restaurante",
        label: "Restaurante / Food service",
        weight: { landing: 2, ecommerce: 1, chatbot: 2 },
      },
      {
        value: "salud",
        label: "Salud / Bienestar",
        weight: { sistema: 2, landing: 2 },
      },
      {
        value: "educacion",
        label: "Educación / Capacitación",
        weight: { sistema: 2, landing: 1 },
      },
      {
        value: "manufactura",
        label: "Manufactura / Producción",
        weight: { sistema: 3, landing: 1 },
      },
      { value: "otro", label: "Otro", weight: { landing: 1 } },
    ],
    required: true,
    category: "negocio",
  },
  {
    id: "business_size",
    question: "¿Cuántos empleados tiene tu empresa?",
    type: "single",
    options: [
      { value: "solo", label: "Solo yo", weight: { landing: 2, chatbot: 1 } },
      {
        value: "micro",
        label: "2-5 empleados",
        weight: { landing: 2, sistema: 1 },
      },
      {
        value: "pequena",
        label: "6-20 empleados",
        weight: { sistema: 2, landing: 1 },
      },
      { value: "mediana", label: "21-50 empleados", weight: { sistema: 3 } },
      {
        value: "grande",
        label: "Más de 50 empleados",
        weight: { sistema: 3, chatbot: 2 },
      },
    ],
    required: true,
    category: "negocio",
  },
  {
    id: "current_web",
    question: "¿Tu negocio tiene presencia web actualmente?",
    type: "single",
    options: [
      { value: "ninguna", label: "No tengo nada", weight: { landing: 3 } },
      {
        value: "redes",
        label: "Solo redes sociales",
        weight: { landing: 3, chatbot: 1 },
      },
      {
        value: "basica",
        label: "Página web básica/desactualizada",
        weight: { landing: 2 },
      },
      {
        value: "funcional",
        label: "Sitio web funcional",
        weight: { sistema: 1, ecommerce: 1 },
      },
      {
        value: "avanzada",
        label: "Sitio web con funcionalidades avanzadas",
        weight: { sistema: 2, chatbot: 1 },
      },
    ],
    required: true,
    category: "situacion",
  },

  // SECCIÓN 2: OBJETIVOS
  {
    id: "main_goal",
    question: "¿Cuál es tu objetivo principal ahora mismo?",
    type: "single",
    options: [
      {
        value: "visibilidad",
        label: "Aumentar visibilidad y conseguir clientes",
        weight: { landing: 3, chatbot: 1 },
      },
      {
        value: "ventas_online",
        label: "Vender productos en línea",
        weight: { ecommerce: 3 },
      },
      {
        value: "automatizar",
        label: "Automatizar procesos internos",
        weight: { sistema: 3, chatbot: 2 },
      },
      {
        value: "atencion",
        label: "Mejorar atención al cliente",
        weight: { chatbot: 3, sistema: 1 },
      },
      {
        value: "escalar",
        label: "Escalar operaciones",
        weight: { sistema: 3, ecommerce: 1 },
      },
    ],
    required: true,
    category: "objetivos",
  },
  {
    id: "secondary_goals",
    question:
      "¿Qué otros objetivos te gustaría lograr? (Selecciona todos los que apliquen)",
    type: "multiple",
    options: [
      {
        value: "leads",
        label: "Capturar más leads/contactos",
        weight: { landing: 2, chatbot: 1 },
      },
      {
        value: "reservas",
        label: "Sistema de reservas/citas",
        weight: { sistema: 2 },
      },
      {
        value: "inventario",
        label: "Control de inventario",
        weight: { sistema: 2, ecommerce: 1 },
      },
      {
        value: "facturacion",
        label: "Facturación automática",
        weight: { sistema: 2 },
      },
      {
        value: "reportes",
        label: "Reportes y métricas",
        weight: { sistema: 2 },
      },
      {
        value: "whatsapp",
        label: "Atención por WhatsApp 24/7",
        weight: { chatbot: 3 },
      },
    ],
    required: false,
    category: "objetivos",
  },

  // SECCIÓN 3: PROBLEMAS ACTUALES
  {
    id: "main_problem",
    question: "¿Cuál es el mayor problema que enfrentas actualmente?",
    type: "single",
    options: [
      {
        value: "no_clientes",
        label: "No llegan suficientes clientes",
        weight: { landing: 3, chatbot: 1 },
      },
      {
        value: "tiempo",
        label: "Pierdo mucho tiempo en tareas repetitivas",
        weight: { sistema: 3, chatbot: 2 },
      },
      {
        value: "desorganizacion",
        label: "Desorganización en procesos",
        weight: { sistema: 3 },
      },
      {
        value: "atencion_lenta",
        label: "No puedo responder rápido a clientes",
        weight: { chatbot: 3 },
      },
      {
        value: "ventas_fisicas",
        label: "Solo vendo de forma presencial",
        weight: { ecommerce: 3, landing: 1 },
      },
      {
        value: "competencia",
        label: "La competencia me está ganando online",
        weight: { landing: 2, ecommerce: 2 },
      },
    ],
    required: true,
    category: "problemas",
  },
  {
    id: "messages_volume",
    question: "¿Cuántos mensajes de clientes recibes aproximadamente al día?",
    type: "single",
    options: [
      { value: "pocos", label: "Menos de 10", weight: { landing: 1 } },
      { value: "moderado", label: "10-30 mensajes", weight: { chatbot: 1 } },
      { value: "muchos", label: "30-100 mensajes", weight: { chatbot: 2 } },
      {
        value: "masivo",
        label: "Más de 100 mensajes",
        weight: { chatbot: 3, sistema: 1 },
      },
    ],
    required: true,
    category: "problemas",
  },

  // SECCIÓN 4: NECESIDADES ESPECÍFICAS
  {
    id: "need_ecommerce",
    question: "¿Necesitas vender productos físicos o digitales en línea?",
    type: "single",
    options: [
      { value: "no", label: "No, solo servicios", weight: { landing: 1 } },
      {
        value: "pocos",
        label: "Sí, pocos productos (menos de 50)",
        weight: { ecommerce: 2 },
      },
      {
        value: "catalogo",
        label: "Sí, catálogo mediano (50-500)",
        weight: { ecommerce: 3 },
      },
      {
        value: "grande",
        label: "Sí, catálogo grande (+500)",
        weight: { ecommerce: 3, sistema: 1 },
      },
    ],
    required: true,
    category: "necesidades",
  },
  {
    id: "need_system",
    question: "¿Qué procesos te gustaría digitalizar?",
    type: "multiple",
    options: [
      { value: "ninguno", label: "Ninguno por ahora", weight: { landing: 1 } },
      {
        value: "clientes",
        label: "Gestión de clientes (CRM)",
        weight: { sistema: 2 },
      },
      {
        value: "inventario",
        label: "Control de inventario",
        weight: { sistema: 2 },
      },
      {
        value: "empleados",
        label: "Gestión de empleados",
        weight: { sistema: 2 },
      },
      {
        value: "contabilidad",
        label: "Contabilidad básica",
        weight: { sistema: 2 },
      },
      {
        value: "proyectos",
        label: "Gestión de proyectos",
        weight: { sistema: 2 },
      },
    ],
    required: false,
    category: "necesidades",
  },

  // SECCIÓN 5: PRESUPUESTO Y TIEMPO
  {
    id: "budget",
    question: "¿Cuál es tu presupuesto aproximado para esta inversión?",
    type: "single",
    options: [
      { value: "bajo", label: "Menos de RD$30,000", weight: { landing: 2 } },
      {
        value: "medio_bajo",
        label: "RD$30,000 - RD$80,000",
        weight: { landing: 2, chatbot: 1 },
      },
      {
        value: "medio",
        label: "RD$80,000 - RD$150,000",
        weight: { ecommerce: 2, sistema: 1 },
      },
      {
        value: "medio_alto",
        label: "RD$150,000 - RD$300,000",
        weight: { sistema: 2, ecommerce: 2 },
      },
      {
        value: "alto",
        label: "Más de RD$300,000",
        weight: { sistema: 3, ecommerce: 2 },
      },
    ],
    required: true,
    category: "presupuesto",
  },
  {
    id: "urgency",
    question: "¿Qué tan urgente es implementar esta solución?",
    type: "single",
    options: [
      {
        value: "explorando",
        label: "Solo estoy explorando opciones",
        weight: {},
      },
      { value: "trimestre", label: "En los próximos 3 meses", weight: {} },
      { value: "mes", label: "Este mes", weight: {} },
      { value: "urgente", label: "Lo antes posible", weight: {} },
    ],
    required: true,
    category: "presupuesto",
  },

  // SECCIÓN 6: PREFERENCIAS
  {
    id: "tech_comfort",
    question: "¿Qué tan cómodo te sientes con la tecnología?",
    type: "single",
    options: [
      {
        value: "basico",
        label: "Básico - Necesito algo muy simple",
        weight: { landing: 1 },
      },
      { value: "intermedio", label: "Intermedio - Puedo aprender", weight: {} },
      {
        value: "avanzado",
        label: "Avanzado - Me gusta la tecnología",
        weight: { sistema: 1 },
      },
    ],
    required: true,
    category: "preferencias",
  },
];

export const solutionDescriptions = {
  landing: {
    name: "Landing Page / Sitio Web",
    description:
      "Página web profesional optimizada para convertir visitantes en clientes.",
    benefits: [
      "Presencia profesional 24/7",
      "Optimización para buscadores (SEO)",
      "Formularios de contacto",
      "Diseño responsive",
    ],
    plans: ["La Chispa", "La Fragua", "Acero"],
  },
  ecommerce: {
    name: "E-commerce / Tienda Online",
    description: "Plataforma completa para vender productos en línea.",
    benefits: [
      "Catálogo de productos",
      "Carrito de compras",
      "Pasarela de pagos",
      "Gestión de inventario",
    ],
    plans: ["Tienda Start", "E-commerce Pro", "Marketplace"],
  },
  sistema: {
    name: "Sistema a Medida",
    description:
      "Software personalizado para automatizar y gestionar tu negocio.",
    benefits: [
      "Automatización de procesos",
      "Reportes personalizados",
      "Integración con otras herramientas",
      "Escalable según crecimiento",
    ],
    plans: ["Agenda Simple", "Gestión Pro", "Sistema Administrativo"],
  },
  chatbot: {
    name: "Chatbot / Automatización IA",
    description: "Asistente virtual para atender clientes automáticamente.",
    benefits: [
      "Atención 24/7",
      "Respuestas instantáneas",
      "Captura de leads automática",
      "Integración con WhatsApp",
    ],
    plans: ["El Portero", "Bot Captador", "NeuroBot"],
  },
};
