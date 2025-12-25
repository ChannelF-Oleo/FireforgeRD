"use server";

import { z } from "zod";
import { Resend } from "resend";

// --- IMPORTAMOS LAS PLANTILLAS ---
// Asegúrate de haber creado también LeadNotification (para el admin) 
// o usa html simple para el admin si prefieres.
import { ClientConfirmation } from "@/emails/ClientConfirmation";
import { LeadNotification } from "@/emails/LeadNotification"; 

// --- CONFIGURACIÓN ---

const schema = z.object({
  clientName: z.string().min(2, "Nombre requerido"),
  companyName: z.string().min(2, "Empresa requerida"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(8, "WhatsApp inválido"),
  serviceType: z.string().min(1, "Servicio requerido"),
  plan: z.string().optional(),
  notes: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

const generateCorrelationId = () =>
  `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const getDominicanTime = () =>
  new Date().toLocaleString("es-DO", { timeZone: "America/Santo_Domingo" });

// --- SERVER ACTION ---

export async function submitContactForm(prevState: any, formData: FormData) {
  const correlationId = generateCorrelationId();
  const timestamp = getDominicanTime();

  console.log(`[${correlationId}] Procesando Lead...`);

  // A. Extracción
  const rawData = {
    clientName: formData.get("clientName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
    serviceType: formData.get("serviceType"),
    plan: formData.get("plan") || "N/A",
    notes: formData.get("notes") || "Sin notas",
  };

  // B. Validación
  const validatedFields = schema.safeParse(rawData);

  if (!validatedFields.success) {
    return { success: false, message: "Datos incompletos." };
  }

  const data = validatedFields.data;

  // --- PASO 1: PERSISTENCIA (Google Sheets) ---
  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: correlationId,
        date: timestamp,
        ...data, // Spread operator para limpiar código
      }),
    });

    if (!response.ok) throw new Error("Google Script Error");
    console.log(`[${correlationId}] ✅ Guardado en Sheets.`);
    
  } catch (error) {
    console.error(`[${correlationId}] ❌ Error Sheets:`, error);
    return { success: false, message: "Error de sistema. Contáctanos por WhatsApp." };
  }

  // --- PASO 2: NOTIFICACIÓN (Resend con React Email) ---
  try {
    // 1. Email para el ADMIN (Interno)
    const adminEmailPromise = resend.emails.send({
      from: "FireforgeRD <notifications@fireforgerd.com>", // Usa tu dominio verificado
      to: [process.env.ADMIN_EMAIL || "channelf@fireforgerd.com"],
      replyTo: data.email,
      subject: `🔥 Lead: ${data.companyName}`,
      // Usamos el componente React
      react: LeadNotification({
        clientName: data.clientName,
        companyName: data.companyName,
        serviceType: data.serviceType,
        email: data.email,
        whatsapp: data.whatsapp,
        notes: data.notes
      }) as React.ReactElement,
    });

    // 2. Email para el CLIENTE (Confirmación)
    const userEmailPromise = resend.emails.send({
      from: "FireforgeRD <onboarding@fireforgerd.com>", // Usa tu dominio verificado
      to: [data.email],
      subject: "Hemos recibido tu solicitud - FireforgeRD",
      // Usamos el componente React
      react: ClientConfirmation({
        clientName: data.clientName,
        serviceType: data.serviceType,
        plan: data.plan
      }) as React.ReactElement,
    });

    await Promise.allSettled([adminEmailPromise, userEmailPromise]);
    console.log(`[${correlationId}] ✅ Emails enviados (React Email).`);

  } catch (emailError) {
    console.error(`[${correlationId}] ⚠️ Error emails:`, emailError);
    // No bloqueamos el éxito si falla el email, ya se guardó en Sheets
  }

  return { success: true, message: "Solicitud procesada exitosamente" };
}

