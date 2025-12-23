# 🔥 FireforgeRD

**Infraestructura Digital de Alto Rendimiento** — Plataforma web corporativa para FireforgeRD, una agencia de desarrollo web y automatización en República Dominicana.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## 📋 Descripción

Landing page moderna con diseño "Ember Glass" que incluye:

- **Hero Section** — Animaciones con Framer Motion
- **Servicios** — Grid de cards con glassmorphism
- **Precios** — Matriz de planes interactiva
- **FAQ** — Sección de preguntas frecuentes
- **Contacto** — Formulario con validación Zod + React Hook Form

## 🛠️ Stack Tecnológico

| Categoría    | Tecnología                  |
| ------------ | --------------------------- |
| Framework    | Next.js 16 (App Router)     |
| UI           | React 19, Tailwind CSS 4    |
| Animaciones  | Framer Motion               |
| Formularios  | React Hook Form + Zod       |
| Email        | Resend API                  |
| Persistencia | Google Sheets (Apps Script) |
| Iconos       | Lucide React                |

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/ChannelF-Oleo/FireforgeRD.git
cd FireforgeRD

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

## ⚙️ Variables de Entorno

Crear archivo `.env.local` basado en `.env.example`:

```env
# Google Apps Script (para guardar leads)
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/xxx/exec

# Resend (notificaciones por email)
RESEND_API_KEY=re_xxx

# WhatsApp
WHATSAPP_PHONE_NUMBER=18091234567
WHATSAPP_DEFAULT_MESSAGE=Hola, me interesa conocer más sobre FireforgeRD

# Admin
ADMIN_EMAIL=admin@fireforge.com
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/contact/      # API routes
│   ├── actions.ts        # Server Actions
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página principal
├── components/
│   ├── layout/           # Header, Footer, WhatsApp flotante
│   ├── sections/         # Hero, Services, Pricing, FAQ, Contact
│   └── ui/               # Componentes reutilizables
├── lib/                  # Utilidades y datos
└── types/                # Tipos TypeScript
```

## 📜 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Iniciar producción
npm run lint     # Ejecutar ESLint
```

## 🎨 Sistema de Diseño

**Paleta "Ember Glass":**

- Background: `#F9F8F6`
- Primary: `#FF4D00`
- Text: `#1A1818`
- Muted: `#6F6B65`

## 📄 Licencia

Proyecto privado — © 2025 FireforgeRD
