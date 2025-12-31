"use server";

import { z } from "zod";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

// --- IMPORTAMOS LAS PLANTILLAS ---
import { ClientConfirmation } from "@/emails/ClientConfirmation";
import { LeadNotification } from "@/emails/LeadNotification";
import { QuizResults } from "@/emails/QuizResults";
import { QuizConfirmation } from "@/emails/QuizConfirmation";

// --- SCHEMAS ---

const contactSchema = z.object({
  clientName: z.string().min(2, "Nombre requerido"),
  companyName: z.string().min(2, "Empresa requerida"),
  email: z.string().email({ message: "Email inválido" }),
  whatsapp: z.string().min(8, "WhatsApp inválido"),
  serviceType: z.string().min(1, "Servicio requerido"),
  plan: z.string().optional(),
  notes: z.string().optional(),
});

const quizSchema = z.object({
  clientName: z.string().min(2, "Nombre requerido"),
  email: z.string().email({ message: "Email inválido" }),
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  recommendation: z.string(),
  recommendationDescription: z.string(),
  benefits: z.array(z.string()),
  suggestedPlans: z.array(z.string()),
  scores: z.record(z.string(), z.number()),
});

// --- CONFIGURACIÓN ---

const resend = new Resend(process.env.RESEND_API_KEY);

const generateCorrelationId = () =>
  `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

const getDominicanTime = () =>
  new Date().toLocaleString("es-DO", { timeZone: "America/Santo_Domingo" });

// ===========================================
// SERVER ACTION: CONTACT FORM
// ===========================================

export async function submitContactForm(
  _prevState: unknown,
  formData: FormData,
) {
  const correlationId = generateCorrelationId();
  const timestamp = getDominicanTime();

  console.log(`[${correlationId}] Procesando Lead de Contacto...`);

  const rawData = {
    clientName: formData.get("clientName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
    serviceType: formData.get("serviceType"),
    plan: formData.get("plan") || "N/A",
    notes: formData.get("notes") || "Sin notas",
  };

  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { success: false, message: "Datos incompletos." };
  }

  const data = validatedFields.data;

  // --- PASO 1: PERSISTENCIA (Firebase + Google Sheets) ---
  try {
    // Guardar en Firebase
    await adminDb.collection("leads").add({
      ...data,
      correlationId,
      source: "contact-form",
      status: "nuevo",
      createdAt: Timestamp.now(),
    });
    console.log(`[${correlationId}] ✅ Guardado en Firebase.`);

    // También guardar en Google Sheets (backup)
    if (process.env.GOOGLE_SCRIPT_URL) {
      await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: correlationId, date: timestamp, ...data }),
      });
      console.log(`[${correlationId}] ✅ Guardado en Sheets.`);
    }
  } catch (error) {
    console.error(`[${correlationId}] ❌ Error persistencia:`, error);
    return {
      success: false,
      message: "Error de sistema. Contáctanos por WhatsApp.",
    };
  }

  // --- PASO 2: NOTIFICACIÓN (Resend) ---
  try {
    const adminEmailPromise = resend.emails.send({
      from: "FireforgeRD <notifications@fireforgerd.com>",
      to: [process.env.ADMIN_EMAIL || "channelf@fireforgerd.com"],
      replyTo: data.email,
      subject: `🔥 Lead: ${data.companyName}`,
      react: LeadNotification({
        clientName: data.clientName,
        companyName: data.companyName,
        serviceType: data.serviceType,
        email: data.email,
        whatsapp: data.whatsapp,
        notes: data.notes,
      }) as React.ReactElement,
    });

    const userEmailPromise = resend.emails.send({
      from: "FireforgeRD <onboarding@fireforgerd.com>",
      to: [data.email],
      subject: "Hemos recibido tu solicitud - FireforgeRD",
      react: ClientConfirmation({
        clientName: data.clientName,
        serviceType: data.serviceType,
        plan: data.plan,
      }) as React.ReactElement,
    });

    await Promise.allSettled([adminEmailPromise, userEmailPromise]);
    console.log(`[${correlationId}] ✅ Emails enviados.`);
  } catch (emailError) {
    console.error(`[${correlationId}] ⚠️ Error emails:`, emailError);
  }

  return { success: true, message: "Solicitud procesada exitosamente" };
}

// ===========================================
// SERVER ACTION: QUIZ DIAGNÓSTICO
// ===========================================

export async function submitQuizResults(data: {
  clientName: string;
  email: string;
  answers: Record<string, string | string[]>;
  recommendation: string;
  recommendationDescription: string;
  benefits: string[];
  suggestedPlans: string[];
  scores: Record<string, number>;
}) {
  const correlationId = generateCorrelationId();

  console.log(`[${correlationId}] Procesando resultado de Quiz...`);

  const validatedFields = quizSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: "Datos incompletos." };
  }

  const validData = validatedFields.data;

  // --- PASO 1: PERSISTENCIA (Firebase) ---
  try {
    await adminDb.collection("quiz_results").add({
      ...validData,
      correlationId,
      status: "nuevo",
      createdAt: Timestamp.now(),
    });
    console.log(`[${correlationId}] ✅ Quiz guardado en Firebase.`);
  } catch (error) {
    console.error(`[${correlationId}] ❌ Error persistencia quiz:`, error);
    return {
      success: false,
      message: "Error al guardar resultados.",
    };
  }

  // --- PASO 2: NOTIFICACIÓN (Resend) ---
  try {
    // Email para el ADMIN
    const adminEmailPromise = resend.emails.send({
      from: "FireforgeRD <notifications@fireforgerd.com>",
      to: [process.env.ADMIN_EMAIL || "channelf@fireforgerd.com"],
      replyTo: validData.email,
      subject: `🎯 Diagnóstico: ${validData.clientName}`,
      react: QuizResults({
        clientName: validData.clientName,
        clientEmail: validData.email,
        recommendation: validData.recommendation,
        recommendationDescription: validData.recommendationDescription,
        benefits: validData.benefits,
        suggestedPlans: validData.suggestedPlans,
        scores: validData.scores,
      }) as React.ReactElement,
    });

    // Email para el CLIENTE
    const userEmailPromise = resend.emails.send({
      from: "FireforgeRD <onboarding@fireforgerd.com>",
      to: [validData.email],
      subject: "Tu diagnóstico tecnológico está listo - FireforgeRD",
      react: QuizConfirmation({
        clientName: validData.clientName,
        recommendation: validData.recommendation,
        recommendationDescription: validData.recommendationDescription,
        benefits: validData.benefits,
        suggestedPlans: validData.suggestedPlans,
      }) as React.ReactElement,
    });

    await Promise.allSettled([adminEmailPromise, userEmailPromise]);
    console.log(`[${correlationId}] ✅ Emails de quiz enviados.`);
  } catch (emailError) {
    console.error(`[${correlationId}] ⚠️ Error emails quiz:`, emailError);
  }

  return { success: true, message: "Diagnóstico guardado exitosamente" };
}
