"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LazyMotion, MotionConfig, domAnimation, m, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Clock, Loader2, Mail, MessageCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions";
import { ecommerceServices, serviceCategories } from "@/lib/services-data";
import type { ServicePlan } from "@/types";
import { SectionHeader } from "@/components/ds/SectionHeader";
import { email as contactEmail, whatsappHref } from "@/components/ds/nav";
import { container, ctaAccent, focusRing, heading, usd } from "@/components/ds/ui";

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

// Estilos locales (Swiss: radio 0, bordes de 1px, sin sombras), los mismos
// que la captura de email del diagnóstico.
const labelClass = "block text-sm font-medium";
const optionalTag = "font-normal text-(--ds-muted-fg)";
const fieldError = "mt-2 text-sm font-medium text-(--ds-destructive)";
const fieldHint = "mt-2 text-sm text-(--ds-muted-fg)";
const inputBase = `mt-2 min-h-11 w-full border bg-(--ds-card) px-4 py-3 text-base text-(--ds-fg) transition-colors duration-200 placeholder:text-(--ds-muted-fg) motion-reduce:transition-none ${focusRing}`;
const borderFor = (invalid: boolean) =>
  invalid ? "border-(--ds-destructive)" : "border-(--ds-border) hover:border-(--ds-fg)";
const selectBase = `${inputBase} cursor-pointer appearance-none pr-10 disabled:cursor-not-allowed disabled:bg-(--ds-muted) disabled:text-(--ds-muted-fg) disabled:hover:border-(--ds-border)`;
const textLink = `inline-flex min-h-11 cursor-pointer items-center gap-2 font-medium text-(--ds-primary-text) underline-offset-4 hover:underline ${focusRing}`;

// Precio en el texto de la opción para que el plan se reconozca sin volver a
// la tabla de precios.
function planLabel(plan: ServicePlan) {
  const base = usd(plan.price);
  const price = plan.currency === "USD / Hora" ? `${base}/hora` : plan.setupFee ? `${base} de setup` : base;
  return `${plan.name} · ${price}`;
}

// "Desarrollo Web" mezcla sitios y tiendas: se separan con <optgroup> para que
// la lista de 7 planes se lea mejor. Las demás categorías van planas.
const ecommerceIds = new Set(ecommerceServices.map((p) => p.id));
function planGroups(categoryId: string, plans: readonly ServicePlan[]) {
  if (categoryId !== "web") return [{ label: null, plans }];
  return [
    { label: "Sitios web", plans: plans.filter((p) => !ecommerceIds.has(p.id)) },
    { label: "Tiendas online", plans: plans.filter((p) => ecommerceIds.has(p.id)) },
  ];
}

export function ContactForm({
  initialNotes,
}: {
  /** Texto con el que arranca el campo de notas (p. ej. "Quiero algo similar a …"). */
  initialNotes?: string;
} = {}) {
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
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { notes: initialNotes ?? "" },
  });

  const selectedServiceId = watch("serviceType");
  const availablePlans: readonly ServicePlan[] = selectedServiceId
    ? serviceCategories.find((cat) => cat.id === selectedServiceId)?.services ||
      []
    : [];

  useEffect(() => {
    setValue("plan", "");
  }, [selectedServiceId, setValue]);

  // Al cambiar a la confirmación, el foco va a su título: el formulario (y el
  // botón que tenía el foco) desaparece y el lector de pantalla lo anuncia.
  useEffect(() => {
    if (isSuccess) successHeadingRef.current?.focus();
  }, [isSuccess]);

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
      <MotionConfig reducedMotion="user">
        <section id="contact" aria-labelledby="contacto-title" className="py-16 md:py-24">
          <div className={container}>
            <SectionHeader
              as="h1"
              id="contacto-title"
              eyebrow="Contacto"
              title="Cuéntanos de tu proyecto"
              intro="Déjanos tus datos y lo que necesitas. Te respondemos con una propuesta en menos de 24 horas."
            />

            <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-6">
              <div className="border border-(--ds-border) bg-(--ds-card) p-6 sm:p-8 md:col-span-8">
                <AnimatePresence mode="wait" initial={false}>
                  {!isSuccess ? (
                    <m.form
                      key="form"
                      noValidate
                      aria-labelledby="contacto-title"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <fieldset className="min-w-0">
                        <legend className="text-xs font-semibold uppercase tracking-wider text-(--ds-muted-fg)">
                          Tus datos
                        </legend>
                        <div className="mt-4 grid gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="clientName" className={labelClass}>
                              Tu nombre
                            </label>
                            <input
                              id="clientName"
                              type="text"
                              autoComplete="name"
                              {...register("clientName")}
                              placeholder="Ej: Ana García"
                              aria-invalid={errors.clientName ? true : undefined}
                              aria-describedby={errors.clientName ? "clientName-error" : undefined}
                              className={`${inputBase} ${borderFor(!!errors.clientName)}`}
                            />
                            {errors.clientName && (
                              <p id="clientName-error" className={fieldError}>
                                {errors.clientName.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="companyName" className={labelClass}>
                              Empresa o negocio
                            </label>
                            <input
                              id="companyName"
                              type="text"
                              autoComplete="organization"
                              {...register("companyName")}
                              placeholder="Ej: Constructora AG"
                              aria-invalid={errors.companyName ? true : undefined}
                              aria-describedby={errors.companyName ? "companyName-error" : undefined}
                              className={`${inputBase} ${borderFor(!!errors.companyName)}`}
                            />
                            {errors.companyName && (
                              <p id="companyName-error" className={fieldError}>
                                {errors.companyName.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="email" className={labelClass}>
                              Correo electrónico
                            </label>
                            <input
                              id="email"
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              {...register("email")}
                              placeholder="tu@email.com"
                              aria-invalid={errors.email ? true : undefined}
                              aria-describedby={errors.email ? "email-error" : undefined}
                              className={`${inputBase} ${borderFor(!!errors.email)}`}
                            />
                            {errors.email && (
                              <p id="email-error" className={fieldError}>
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="whatsapp" className={labelClass}>
                              WhatsApp
                            </label>
                            <input
                              id="whatsapp"
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              {...register("whatsapp")}
                              placeholder="809-555-5555"
                              aria-invalid={errors.whatsapp ? true : undefined}
                              aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                              className={`${inputBase} ${borderFor(!!errors.whatsapp)}`}
                            />
                            {errors.whatsapp && (
                              <p id="whatsapp-error" className={fieldError}>
                                {errors.whatsapp.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className="mt-8 min-w-0 border-t border-(--ds-border) pt-6">
                        <legend className="float-left w-full text-xs font-semibold uppercase tracking-wider text-(--ds-muted-fg)">
                          Tu proyecto
                        </legend>
                        <div className="clear-both grid gap-6 pt-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="serviceType" className={labelClass}>
                              Tipo de servicio
                            </label>
                            <div className="relative">
                              <select
                                id="serviceType"
                                {...register("serviceType")}
                                aria-invalid={errors.serviceType ? true : undefined}
                                aria-describedby={errors.serviceType ? "serviceType-error" : undefined}
                                className={`${selectBase} ${borderFor(!!errors.serviceType)}`}
                              >
                                <option value="">Selecciona un servicio</option>
                                {serviceCategories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                className="pointer-events-none absolute right-3 top-1/2 mt-1 size-4 -translate-y-1/2 text-(--ds-muted-fg)"
                                aria-hidden
                              />
                            </div>
                            {errors.serviceType && (
                              <p id="serviceType-error" className={fieldError}>
                                {errors.serviceType.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="plan" className={labelClass}>
                              Plan <span className={optionalTag}>(opcional)</span>
                            </label>
                            <div className="relative">
                              <select
                                id="plan"
                                {...register("plan")}
                                disabled={!selectedServiceId}
                                aria-describedby="plan-hint"
                                className={`${selectBase} ${borderFor(false)}`}
                              >
                                <option value="">
                                  {selectedServiceId ? "Aún no lo sé" : "Elige primero el servicio"}
                                </option>
                                {selectedServiceId &&
                                  planGroups(selectedServiceId, availablePlans).map((group) =>
                                    group.label ? (
                                      <optgroup key={group.label} label={group.label}>
                                        {group.plans.map((plan) => (
                                          <option key={plan.id} value={plan.name}>
                                            {planLabel(plan)}
                                          </option>
                                        ))}
                                      </optgroup>
                                    ) : (
                                      group.plans.map((plan) => (
                                        <option key={plan.id} value={plan.name}>
                                          {planLabel(plan)}
                                        </option>
                                      ))
                                    ),
                                  )}
                              </select>
                              <ChevronDown
                                className="pointer-events-none absolute right-3 top-1/2 mt-1 size-4 -translate-y-1/2 text-(--ds-muted-fg)"
                                aria-hidden
                              />
                            </div>
                            <p id="plan-hint" className={fieldHint}>
                              {selectedServiceId
                                ? `${availablePlans.length} planes. Si no sabes cuál, te orientamos.`
                                : "Se activa al elegir el tipo de servicio."}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <label htmlFor="notes" className={labelClass}>
                            ¿Qué necesitas? <span className={optionalTag}>(opcional)</span>
                          </label>
                          <textarea
                            id="notes"
                            {...register("notes")}
                            placeholder="Cuéntanos brevemente tu proyecto, plazos o dudas."
                            rows={4}
                            className={`${inputBase} ${borderFor(false)} resize-y`}
                          />
                        </div>
                      </fieldset>

                      {/* ERROR DE ENVÍO */}
                      {submitError && (
                        <div
                          role="alert"
                          className="mt-8 border border-(--ds-destructive) bg-(--ds-card) p-4 text-sm text-(--ds-fg)"
                        >
                          <p className="font-semibold text-(--ds-destructive)">
                            No pudimos enviar tu solicitud automáticamente.
                          </p>
                          <p className="mt-1">
                            {submitError.popupAbierto
                              ? "Te abrimos WhatsApp en otra pestaña. Si no se abrió, "
                              : "Tu navegador bloqueó la ventana de WhatsApp. "}
                            <a
                              href={submitError.whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium text-(--ds-primary-text) underline underline-offset-4 ${focusRing}`}
                            >
                              escríbenos directo por WhatsApp
                            </a>{" "}
                            o vuelve a intentarlo.
                          </p>
                        </div>
                      )}

                      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-(--ds-muted-fg)">Todos los campos sin “(opcional)” son obligatorios.</p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          aria-busy={isSubmitting || undefined}
                          className={`${ctaAccent} w-full shrink-0 sm:w-auto disabled:cursor-wait disabled:opacity-70`}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />
                              Enviando...
                            </>
                          ) : (
                            <>
                              Solicitar cotización
                              <ArrowRight className="size-4" aria-hidden />
                            </>
                          )}
                        </button>
                      </div>
                    </m.form>
                  ) : (
                    <m.div
                      key="success"
                      role="status"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="py-6"
                    >
                      <span className="inline-flex size-12 items-center justify-center bg-(--ds-accent) text-(--ds-on-accent)">
                        <Check className="size-6" strokeWidth={3} aria-hidden />
                      </span>
                      <h2
                        ref={successHeadingRef}
                        tabIndex={-1}
                        className={`${heading} mt-6 text-3xl font-semibold tracking-tight outline-none`}
                      >
                        ¡Recibido!
                      </h2>
                      <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-(--ds-muted-fg)">
                        Gracias, <strong className="font-semibold text-(--ds-fg)">{submittedName}</strong>. Te
                        enviamos un correo de confirmación y te contactaremos pronto.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSuccess(false);
                          setSubmittedName("");
                          reset();
                        }}
                        className={`${textLink} mt-6`}
                      >
                        Enviar otra solicitud
                      </button>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              <aside aria-labelledby="contacto-directo-title" className="md:col-span-4">
                <h2
                  id="contacto-directo-title"
                  className="text-xs font-semibold uppercase tracking-wider text-(--ds-muted-fg)"
                >
                  ¿Prefieres hablar directo?
                </h2>
                <ul className="mt-4 divide-y divide-(--ds-border) border-y border-(--ds-border)">
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex min-h-11 items-center gap-3 py-4 font-medium hover:text-(--ds-primary-text) ${focusRing}`}
                    >
                      <MessageCircle className="size-5 shrink-0 text-(--ds-primary)" aria-hidden />
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contactEmail}`}
                      className={`flex min-h-11 items-center gap-3 py-4 font-medium break-all hover:text-(--ds-primary-text) ${focusRing}`}
                    >
                      <Mail className="size-5 shrink-0 text-(--ds-primary)" aria-hidden />
                      {contactEmail}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 py-4 text-(--ds-muted-fg)">
                    <Clock className="mt-0.5 size-5 shrink-0" aria-hidden />
                    Respondemos en menos de 24 horas.
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
