# FireforgeRD Platform Design Document

## Overview

FireforgeRD Platform es una landing page premium de conversión high-ticket que implementa el concepto de "Ingeniería Invisible". La plataforma utiliza una arquitectura serverless moderna con Next.js 14, enfocada en capturar leads calificados para servicios digitales premium mediante una experiencia visual técnica y autoritaria.

La solución combina una interfaz frontend sofisticada con un backend serverless que procesa leads automáticamente, eliminando fricciones en el proceso de conversión mientras mantiene una estética que proyecta competencia técnica.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Serverless     │    │   External      │
│   (Next.js 14)  │────│   Backend        │────│   Services      │
│                 │    │   (API Routes)   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ React   │             │ Form    │             │ Google  │
    │ Components│           │ Handler │             │ Sheets  │
    │         │             │         │             │ API     │
    └─────────┘             └─────────┘             └─────────┘
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ Framer  │             │ Data    │             │ Resend  │
    │ Motion  │             │ Validation│           │ Email   │
    │         │             │         │             │ API     │
    └─────────┘             └─────────┘             └─────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom Onyx Flame design system
- **Animations**: Framer Motion for premium micro-interactions
- **Form Handling**: React Hook Form with Zod validation
- **Backend**: Serverless API Routes (Next.js)
- **Database**: Google Sheets API (Zero-maintenance solution)
- **Email Service**: Resend for transactional emails
- **Deployment**: Vercel Edge Network
- **Language**: TypeScript for type safety

## Components and Interfaces

### Core Components

#### 1. Layout Components
- **Header**: Sticky navigation with glassmorphism effect
- **FloatingWhatsApp**: Fixed position contact button with hover animations
- **Footer**: Minimal footer with essential links

#### 2. Section Components
- **HeroSection**: Main value proposition with CTA
- **ServicesGrid**: Interactive service catalog with hover effects
- **PricingMatrix**: Structured pricing tables by service line
- **ContactForm**: Lead capture form with validation and success states
- **FAQSection**: Accordion-style frequently asked questions

#### 3. UI Components
- **Button**: Consistent button styling with hover states
- **Card**: Glassmorphism cards for services and testimonials
- **Input**: Form inputs with focus states and validation feedback
- **LoadingSpinner**: Branded loading animation

### Component Interfaces

```typescript
// Core Types
interface ServicePlan {
  id: string;
  name: string;
  price: number;
  currency: 'RD$';
  idealFor: string;
  features: string[];
  isRecommended?: boolean;
}

interface ContactFormData {
  fullName: string;
  contact: string;
  serviceType: string;
  notes?: string;
}

interface LeadRecord {
  timestamp: string;
  fullName: string;
  contact: string;
  serviceType: string;
  notes: string;
}

// Component Props
interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

interface ServiceCardProps {
  service: ServicePlan;
  onSelect: (serviceId: string) => void;
}

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
}
```

## Data Models

### Service Catalog Structure

```typescript
interface ServiceCatalog {
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
```

### Lead Processing Flow

```typescript
interface LeadProcessingRequest {
  formData: ContactFormData;
  timestamp: Date;
  source: 'contact-form' | 'whatsapp-redirect';
}

interface LeadProcessingResponse {
  success: boolean;
  leadId?: string;
  error?: string;
}

interface EmailNotification {
  to: string;
  bcc: string[];
  subject: string;
  htmlContent: string;
  leadData: ContactFormData;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:

- **UI Styling Properties**: Properties 1.1, 1.5, 5.4, and 5.5 can be combined into comprehensive styling validation
- **Form Validation Properties**: Properties 3.1, 3.4, and 3.5 can be unified into complete form behavior testing
- **Lead Processing Properties**: Properties 3.2, 4.1, 4.2, and 4.3 can be consolidated into end-to-end lead processing validation
- **Interactive Feedback Properties**: Properties 1.3, 2.2, 5.2, and 7.4 can be combined into comprehensive interaction testing

### Core Properties

**Property 1: Onyx Flame Design System Consistency**
*For any* UI element in the platform, all styling should conform to the Onyx Flame design system with black backgrounds (#0F0F0F), orange accents (#FF6600), and Manrope typography
**Validates: Requirements 1.1, 1.5**

**Property 2: Interactive Element Feedback**
*For any* interactive element (buttons, cards, links), hovering should provide immediate visual feedback with appropriate styling changes (glow effects, scaling, color transitions)
**Validates: Requirements 1.3, 5.2, 7.4**

**Property 3: Scroll-Triggered UI Changes**
*For any* scroll event on the page, the header should dynamically apply glassmorphism effects (backdrop-blur-md) when scrolled past the initial position
**Validates: Requirements 1.2**

**Property 4: Service Catalog Navigation**
*For any* service card click, the platform should smoothly scroll to the pricing section and highlight the corresponding pricing information
**Validates: Requirements 2.2**

**Property 5: Pricing Display Formatting**
*For any* pricing information displayed, amounts should be formatted with "RD$" currency prefix and recommended plans should display star indicators
**Validates: Requirements 2.3, 2.5**

**Property 6: Service Information Completeness**
*For any* service plan displayed, it should contain both characteristics list and ideal customer profile information
**Validates: Requirements 2.4**

**Property 7: Form Validation Behavior**
*For any* form submission attempt, the contact form should validate required fields (fullName, contact, serviceType) and display appropriate error messages for invalid inputs
**Validates: Requirements 3.1**

**Property 8: Lead Processing Round Trip**
*For any* valid form submission, the complete lead processing flow should execute: save to Google Sheets with timestamp, send confirmation email, and display success state
**Validates: Requirements 3.2, 3.3, 3.4**

**Property 9: Error Handling Guidance**
*For any* form submission failure, the system should display error messages directing users to WhatsApp contact as fallback
**Validates: Requirements 3.5**

**Property 10: Lead Data Format Consistency**
*For any* lead processed, the data should be stored in Google Sheets with exact format: [timestamp, fullName, contact, serviceType, notes] using Dominican Republic timezone
**Validates: Requirements 4.1, 4.3**

**Property 11: Administrative Notification**
*For any* successful lead processing, an administrative notification email should be sent containing all lead details
**Validates: Requirements 4.2**

**Property 12: Default Value Handling**
*For any* form submission with empty optional fields, the system should apply appropriate default values ("Sin notas" for empty notes field)
**Validates: Requirements 4.5**

**Property 13: WhatsApp Button Positioning**
*For any* device or viewport size, the floating WhatsApp button should maintain bottom-right positioning with z-index 50 and glassmorphism styling
**Validates: Requirements 5.1, 5.4, 5.5**

**Property 14: External Link Behavior**
*For any* WhatsApp button click, the system should open WhatsApp with pre-filled business contact information
**Validates: Requirements 5.3**

**Property 15: API Route Architecture**
*For any* form submission, the backend should process requests through Next.js API Routes with proper error handling and HTTP status codes
**Validates: Requirements 6.1, 6.3**

**Property 16: Secure API Integration**
*For any* external service integration, the system should use environment variables for credentials and establish secure connections to Google Sheets and Resend APIs
**Validates: Requirements 6.2, 6.4**

**Property 17: Performance Framework Usage**
*For any* page load, the platform should utilize Next.js 14 App Router architecture and Framer Motion for animations
**Validates: Requirements 7.1, 7.2**

**Property 18: Loading State Management**
*For any* asynchronous operation, the UI should display appropriate loading states and provide instant feedback for user interactions
**Validates: Requirements 7.3, 7.4**

**Property 19: Asset Optimization**
*For any* images and assets rendered, they should use Next.js optimization features for fast loading times
**Validates: Requirements 7.5**

**Property 20: Configuration-Driven Content**
*For any* service information or pricing data, it should be sourced from configuration files rather than hardcoded values to enable updates without code changes
**Validates: Requirements 8.1, 8.2**

**Property 21: Error Logging and Monitoring**
*For any* system error or exception, appropriate error information should be logged with sufficient detail for debugging
**Validates: Requirements 8.3**

<function_calls>
<invoke name="prework">
<parameter name="featureName">fireforge-platform

## Error Handling

### Frontend Error Handling

**Form Validation Errors**
- Real-time validation feedback using Zod schema validation
- Field-level error messages with clear, actionable guidance
- Visual error states with red accent colors maintaining design consistency
- Graceful degradation for JavaScript-disabled environments

**Network Error Handling**
- Retry mechanisms for transient network failures
- Fallback to WhatsApp contact when form submission fails
- Loading states to prevent multiple submissions
- Clear error messaging that maintains user confidence

**UI Error Boundaries**
- React Error Boundaries to catch component-level errors
- Fallback UI components that maintain design consistency
- Error reporting to monitoring services for debugging

### Backend Error Handling

**API Route Error Management**
```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Standard error responses
const ErrorResponses = {
  VALIDATION_ERROR: { status: 400, code: 'VALIDATION_ERROR' },
  SHEETS_API_ERROR: { status: 500, code: 'SHEETS_API_ERROR' },
  EMAIL_SERVICE_ERROR: { status: 500, code: 'EMAIL_SERVICE_ERROR' },
  RATE_LIMIT_ERROR: { status: 429, code: 'RATE_LIMIT_ERROR' }
};
```

**External Service Error Handling**
- Google Sheets API: Retry logic with exponential backoff
- Resend API: Fallback email notification to admin if user email fails
- Environment variable validation on startup
- Graceful degradation when services are unavailable

**Logging and Monitoring**
- Structured error logging with correlation IDs
- Performance monitoring for API response times
- Alert thresholds for error rates and service availability

## Testing Strategy

### Dual Testing Approach

The FireforgeRD Platform will implement both unit testing and property-based testing to ensure comprehensive coverage and correctness validation.

**Unit Testing Framework**: Jest with React Testing Library
- Specific examples and edge cases
- Component integration testing
- API endpoint testing with mocked external services
- Error condition validation

**Property-Based Testing Framework**: fast-check (JavaScript/TypeScript)
- Universal properties across all valid inputs
- Minimum 100 iterations per property test
- Each property test tagged with design document reference
- Automated generation of test data within valid domains

### Testing Configuration

**Property-Based Test Requirements**:
- Each correctness property must be implemented as a single property-based test
- Tests must run minimum 100 iterations to ensure statistical confidence
- Each test must include comment: `**Feature: fireforge-platform, Property {number}: {property_text}**`
- Test generators must constrain inputs to valid domain spaces

**Unit Test Coverage**:
- All React components with props validation
- Form validation logic with edge cases
- API routes with various input scenarios
- Error handling paths and fallback behaviors
- Integration points between components

**Test Organization**:
```
/tests
├── unit/
│   ├── components/
│   ├── api/
│   └── utils/
├── properties/
│   ├── ui-properties.test.ts
│   ├── form-properties.test.ts
│   ├── lead-processing-properties.test.ts
│   └── integration-properties.test.ts
└── fixtures/
    ├── mock-data.ts
    └── test-helpers.ts
```

### Performance Testing

**Core Web Vitals Monitoring**:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

**Load Testing Scenarios**:
- Form submission under concurrent load
- API rate limiting validation
- Asset loading performance across devices

### Security Testing

**Input Validation Testing**:
- SQL injection prevention (though using Sheets API)
- XSS prevention in form inputs
- CSRF protection validation
- Rate limiting effectiveness

**API Security Testing**:
- Environment variable exposure prevention
- API key rotation procedures
- Secure header configuration validation

### Deployment Testing

**Pre-deployment Validation**:
- Environment variable configuration verification
- External service connectivity testing
- Build optimization validation
- Performance regression testing

**Post-deployment Monitoring**:
- Real user monitoring (RUM) implementation
- Error rate monitoring and alerting
- Performance metric tracking
- Lead conversion funnel analysis

This comprehensive testing strategy ensures that the FireforgeRD Platform maintains high quality, performance, and reliability while providing confidence in the correctness of all implemented features.