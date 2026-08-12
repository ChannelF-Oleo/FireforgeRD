"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Lock,
  Loader2,
  Mail,
  Phone,
  User,
  Building2,
} from "lucide-react";
import { submitContactForm } from "@/app/actions";
import { serviceCategories } from "@/lib/services-data";

// Schema Frontend (Coincide con Backend)
const formSchema = z.object({
  clientName: z.string().min(2, "Tu nombre es requerido"),
  companyName: z.string().min(2, "Nombre de empresa requerido"),
  email: z.string().email("Correo inválido"),
  whatsapp: z.string().min(8, "WhatsApp inválido (mínimo 8 dígitos)"),
  serviceType: z.string().min(1, "Selecciona una categoría"),
  plan: z.string().optional(),
  notes: z.string().optional(),
});

type FormDataSchema = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Guardamos el nombre antes del reset() para poder saludar en el panel de éxito
  const [submittedName, setSubmittedName] = useState("");
  // Fallo del envío: guarda el link de WhatsApp ya armado y si el popup abrió,
  // para poder decirle al usuario qué hacer en cada caso.
  const [submitError, setSubmitError] = useState<{
    whatsappUrl: string;
    popupAbierto: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
  });

  const selectedServiceId = watch("serviceType");
  const availablePlans = selectedServiceId
    ? serviceCategories.find((cat) => cat.id === selectedServiceId)?.services ||
      []
    : [];

  useEffect(() => {
    setValue("plan", "");
  }, [selectedServiceId, setValue]);

  const onSubmit = async (data: FormDataSchema) => {
    setIsSubmitting(true);
    // Se limpia en cada intento para que un error viejo no quede pegado si el
    // reintento funciona.
    setSubmitError(null);

    const formData = new FormData();
    formData.append("clientName", data.clientName);
    formData.append("companyName", data.companyName);
    formData.append("email", data.email);
    formData.append("whatsapp", data.whatsapp);
    formData.append("serviceType", data.serviceType);
    if (data.plan) formData.append("plan", data.plan);
    if (data.notes) formData.append("notes", data.notes);

    try {
      const response = await submitContactForm(null, formData);

      if (response.success) {
        setSubmittedName(data.clientName);
        setIsSuccess(true);
        reset();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error en envío:", error);
      // Fallback
      const msg = `Hola, soy ${data.clientName} de ${data.companyName}. Tuve un error en el formulario web. Me interesa el servicio de ${data.serviceType}.`;
      const whatsappUrl = `https://wa.me/18498534067?text=${encodeURIComponent(msg)}`;

      // Verificar que estamos en el cliente
      let popupAbierto = false;
      if (typeof window !== "undefined") {
        // window.open devuelve null si el navegador bloqueó el popup; sin esto
        // el usuario se quedaba sin señal de que algo falló.
        popupAbierto = window.open(whatsappUrl, "_blank") !== null;
      }

      setSubmitError({ whatsappUrl, popupAbierto });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#FF4D00]/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F8F6] border border-[#1A1818]/5 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]"></span>
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#5C5850]">
                  Agenda Abierta
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1818] mb-4">
                Inicia tu{" "}
                <span className="text-[#FF4D00] font-medium">
                  Transformación
                </span>
              </h2>
              <p className="text-[#5C5850] text-lg">
                Cuéntanos sobre tu empresa y diseñemos una solución a medida.
              </p>
            </div>

            <div className="rounded-3xl bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#1A1818]/5 overflow-hidden p-8 md:p-10 relative">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <m.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* BLOQUE 1: IDENTIDAD (2 Columnas) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="clientName"
                          className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1"
                        >
                          Tu Nombre
                        </label>
                        <div className="relative group">
                          <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors"
                            aria-hidden="true"
                          />
                          <input
                            id="clientName"
                            {...register("clientName")}
                            placeholder="Ej: Ana García"
                            aria-invalid={errors.clientName ? "true" : "false"}
                            aria-describedby={
                              errors.clientName ? "clientName-error" : undefined
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                          />
                        </div>
                        {errors.clientName && (
                          <p
                            id="clientName-error"
                            className="text-xs text-red-500 ml-1"
                            role="alert"
                          >
                            {errors.clientName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="companyName"
                          className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1"
                        >
                          Empresa
                        </label>
                        <div className="relative group">
                          <Building2
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors"
                            aria-hidden="true"
                          />
                          <input
                            id="companyName"
                            {...register("companyName")}
                            placeholder="Ej: Constructora AG"
                            aria-invalid={errors.companyName ? "true" : "false"}
                            aria-describedby={
                              errors.companyName
                                ? "companyName-error"
                                : undefined
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                          />
                        </div>
                        {errors.companyName && (
                          <p
                            id="companyName-error"
                            className="text-xs text-red-500 ml-1"
                            role="alert"
                          >
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* BLOQUE 2: CONTACTO (2 Columnas) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1"
                        >
                          Correo Electronico
                        </label>
                        <div className="relative group">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors"
                            aria-hidden="true"
                          />
                          <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="ana@gmail.com"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={
                              errors.email ? "email-error" : undefined
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                          />
                        </div>
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-xs text-red-500 ml-1"
                            role="alert"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="whatsapp"
                          className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1"
                        >
                          WhatsApp
                        </label>
                        <div className="relative group">
                          <Phone
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors"
                            aria-hidden="true"
                          />
                          <input
                            id="whatsapp"
                            type="tel"
                            {...register("whatsapp")}
                            placeholder="809-555-5555"
                            aria-invalid={errors.whatsapp ? "true" : "false"}
                            aria-describedby={
                              errors.whatsapp ? "whatsapp-error" : undefined
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                          />
                        </div>
                        {errors.whatsapp && (
                          <p
                            id="whatsapp-error"
                            className="text-xs text-red-500 ml-1"
                            role="alert"
                          >
                            {errors.whatsapp.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* BLOQUE 3: SERVICIOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="relative space-y-1.5">
                        <label
                          htmlFor="serviceType"
                          className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1"
                        >
                          Tipo de Servicio
                        </label>
                        <select
                          id="serviceType"
                          {...register("serviceType")}
                          aria-label="Selecciona el tipo de servicio"
                          className="w-full appearance-none px-4 py-3.5 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 outline-none transition-all text-sm text-[#1A1818] cursor-pointer font-medium"
                        >
                          <option value="">Selecciona Servicio...</option>
                          {serviceCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 bottom-3.5 w-4 h-4 text-[#9C9890] pointer-events-none" />
                        {errors.serviceType && (
                          <p className="text-xs text-red-500 mt-1 ml-1">
                            {errors.serviceType.message}
                          </p>
                        )}
                      </div>

                      <div className="relative space-y-1.5">
                        <label
                          htmlFor="plan"
                          className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1"
                        >
                          Plan
                        </label>
                        <select
                          id="plan"
                          {...register("plan")}
                          disabled={!selectedServiceId}
                          aria-label="Selecciona el plan"
                          className={`w-full appearance-none px-4 py-3.5 rounded-xl border border-transparent outline-none transition-all text-sm cursor-pointer font-medium ${
                            !selectedServiceId
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-[#F9F8F6] focus:bg-white focus:border-[#FF4D00]/30 text-[#1A1818]"
                          }`}
                        >
                          <option value="">
                            {selectedServiceId
                              ? "Selecciona Plan..."
                              : "Elige servicio primero"}
                          </option>
                          {availablePlans.map((plan) => (
                            <option key={plan.id} value={plan.name}>
                              {plan.name}
                            </option>
                          ))}
                        </select>
                        {!selectedServiceId ? (
                          <Lock className="absolute right-3 bottom-3.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        ) : (
                          <ChevronDown className="absolute right-3 bottom-3.5 w-4 h-4 text-[#9C9890] pointer-events-none" />
                        )}
                      </div>
                    </div>

                    {/* NOTAS */}
                    <div className="space-y-1.5">
                      <label htmlFor="notes" className="sr-only">
                        Notas adicionales
                      </label>
                      <textarea
                        id="notes"
                        {...register("notes")}
                        placeholder="Cuéntanos brevemente qué necesitas..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm resize-none"
                      />
                    </div>

                    {/* ERROR DE ENVÍO */}
                    {submitError && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        <p className="font-medium">
                          No pudimos enviar tu solicitud automáticamente.
                        </p>
                        <p className="mt-1 text-red-600">
                          {submitError.popupAbierto ? (
                            <>
                              Te abrimos WhatsApp en otra pestaña. Si no se
                              abrió,{" "}
                            </>
                          ) : (
                            <>
                              Tu navegador bloqueó la ventana de WhatsApp.{" "}
                            </>
                          )}
                          <a
                            href={submitError.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline underline-offset-2 hover:text-red-800"
                          >
                            escribinos directo por WhatsApp
                          </a>{" "}
                          o volvé a intentarlo.
                        </p>
                      </div>
                    )}

                    {/* BOTÓN */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1A1818] hover:bg-[#FF4D00] text-white py-4 px-6 text-sm font-bold tracking-wide transition-all duration-300 shadow-lg hover:shadow-[#FF4D00]/25 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed uppercase"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Procesando...
                        </>
                      ) : (
                        "Solicitar Cotización"
                      )}
                    </button>
                  </m.form>
                ) : (
                  <m.div
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-display text-3xl font-medium text-[#1A1818] mb-4">
                      ¡Recibido!
                    </h3>
                    <p className="text-[#5C5850] mb-8 max-w-md mx-auto">
                      ¡Gracias! <strong>{submittedName}</strong>. Hemos
                      enviado un e-mail de confirmación. Te contactaremos
                      pronto.
                    </p>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setSubmittedName("");
                        reset();
                      }}
                      className="text-sm font-medium text-[#1A1818] underline underline-offset-4 hover:text-[#FF4D00] transition-colors"
                    >
                      Nueva solicitud
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
