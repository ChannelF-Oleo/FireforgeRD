"use server";

import { z } from "zod";
import { Resend } from "resend";

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

const generateCorrelationId = () => `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const getDominicanTime = () => new Date().toLocaleString("es-DO", { timeZone: "America/Santo_Domingo" });

// --- SERVER ACTION ---

export async function submitContactForm(prevState: any, formData: FormData) {
  const correlationId = generateCorrelationId();
  const timestamp = getDominicanTime();

  console.log(`[${correlationId}] Procesando Lead (Método Script)...`);

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

  try {
    // --- PASO 1: PERSISTENCIA (Fetch a Google Apps Script) ---
    // Enviamos los datos formateados al Script
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: correlationId,
        date: timestamp,
        clientName: data.clientName,
        companyName: data.companyName,
        email: data.email,
        whatsapp: data.whatsapp,
        serviceType: data.serviceType,
        plan: data.plan,
        notes: data.notes,
      }),
    });

    if (!response.ok) {
        throw new Error("Error en respuesta de Google Script");
    }

    console.log(`[${correlationId}] ✅ Guardado en Sheets.`);

  } catch (error) {
    console.error(`[${correlationId}] ❌ Error conectando con Sheets:`, error);
    return { success: false, message: "Error de sistema. Contáctanos por WhatsApp." };
  }

  // --- PASO 2: NOTIFICACIÓN (Resend) ---
  // (Este bloque queda IDÉNTICO a como lo teníamos, ya que Resend funciona igual)
  try {
    const adminEmailPromise = resend.emails.send({
      from: 'FireforgeRD <notifications@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'admin@fireforge.com'],
      replyTo: data.email,
      subject: `🔥 Nuevo Lead: ${data.companyName}`,
      html: `
        <p><strong>Cliente:</strong> ${data.clientName} (${data.companyName})</p>
        <p><strong>Contacto:</strong> ${data.whatsapp} | ${data.email}</p>
        <p><strong>Interés:</strong> ${data.serviceType} (${data.plan})</p>
        <p><strong>Notas:</strong> ${data.notes}</p>
      `
    });

    const userEmailPromise = resend.emails.send({
      from: 'FireforgeRD <onboarding@fireforgerd.com>',
      to: [data.email],
      subject: 'Confirmación de Solicitud',
      html: `
        <h1>Hola ${data.clientName},</h1>
        <p>Hemos recibido tu solicitud para <strong>${data.serviceType}</strong>.</p>
        <p>Un ingeniero te contactará en breve.</p>
      `
    });

    await Promise.allSettled([adminEmailPromise, userEmailPromise]);
    console.log(`[${correlationId}] ✅ Emails enviados.`);

  } catch (emailError) {
    console.error(`[${correlationId}] ⚠️ Error emails:`, emailError);
  }

  return { success: true, message: "Solicitud procesada exitosamente" };
}

