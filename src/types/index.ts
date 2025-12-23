// Core Types
export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  currency: 'RD$';
  idealFor: string;
  features: string[];
  isRecommended?: boolean;
  deliveryTime: string;
  category: 'web' | 'ecommerce' | 'saas' | 'automation';
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
  source: 'contact-form' | 'whatsapp-redirect';
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
  details?: any;
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