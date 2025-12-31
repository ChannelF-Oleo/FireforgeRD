// Core Types
export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  currency: "RD$" | "USD";
  idealFor: string;
  features: string[];
  isRecommended?: boolean;
  deliveryTime: string;
  category: "web" | "ecommerce" | "saas" | "automation";
}

export interface ContactFormData {
  fullName: string;
  contact: string;
  serviceType: string;
  notes?: string;
}

export interface LeadRecord {
  timestamp: string;
  fullName: string;
  contact: string;
  serviceType: string;
  notes: string;
}

// ============ BLOG ============
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============ CLIENTES / PORTAFOLIO ============
export interface Client {
  id: string;
  name: string;
  tag: string; // Etiqueta corta (ej: "E-commerce", "Landing Page")
  description: string;
  image: string;
  websiteUrl: string;
  category: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

// ============ QUIZ DIAGNÓSTICO ============
export interface QuizAnswer {
  questionId: string;
  value: string | string[];
}

export interface QuizResult {
  id: string;
  email: string;
  answers: Record<string, string | string[]>;
  recommendationPrimary: string;
  recommendationMix: string[];
  specSummary: Record<string, string>;
  budgetLevel: "bajo" | "medio" | "alto";
  planSuggested: string;
  createdAt: Date;
  source?: string;
  status: "nuevo" | "contactado" | "convertido";
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "single" | "multiple" | "scale" | "text";
  options?: { value: string; label: string; weight?: Record<string, number> }[];
  required: boolean;
  category: string;
}

// ============ CONTACTO ============
export interface ContactSubmission {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  serviceType: string;
  plan?: string;
  notes?: string;
  createdAt: Date;
  status: "nuevo" | "contactado" | "convertido";
}

// Component Props
export interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

export interface ServiceCardProps {
  service: ServicePlan;
  onSelect: (serviceId: string) => void;
}

export interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
}

// API Types
export interface LeadProcessingRequest {
  formData: ContactFormData;
  timestamp: Date;
  source: "contact-form" | "whatsapp-redirect";
}

export interface LeadProcessingResponse {
  success: boolean;
  leadId?: string;
  error?: string;
}

export interface EmailNotification {
  to: string;
  bcc: string[];
  subject: string;
  htmlContent: string;
  leadData: ContactFormData;
}

export interface APIError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

// Service Catalog Structure
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
}
