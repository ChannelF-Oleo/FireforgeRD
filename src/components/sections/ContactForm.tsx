"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageCircle, ChevronDown, Lock, Loader2, Mail, Phone, User, Building2 } from "lucide-react";
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
    ? serviceCategories.find((cat) => cat.id === selectedServiceId)?.services || []
    : [];

  useEffect(() => {
    setValue("plan", "");
  }, [selectedServiceId, setValue]);

  const onSubmit = async (data: FormDataSchema) => {
    setIsSubmitting(true);
    
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
        setIsSuccess(true);
        reset();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error en envío:", error);
      // Fallback
      const msg = `Hola, soy ${data.clientName} de ${data.companyName}. Tuve un error en el formulario web. Me interesa el servicio de ${data.serviceType}.`;
      window.open(`https://wa.me/18290000000?text=${encodeURIComponent(msg)}`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#6F6B65]">Agenda Abierta</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1818] mb-4">
              Inicia tu <span className="text-[#FF4D00] font-medium">Transformación</span>
            </h2>
            <p className="text-[#6F6B65] text-lg">Cuéntanos sobre tu empresa y diseñemos una solución a medida.</p>
          </div>

          <div className="rounded-3xl bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#1A1818]/5 overflow-hidden p-8 md:p-10 relative">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
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
                      <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1">Tu Nombre</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors" />
                        <input
                          {...register("clientName")}
                          placeholder="Ej: Ana García"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                        />
                      </div>
                      {errors.clientName && <p className="text-xs text-red-500 ml-1">{errors.clientName.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1">Empresa</label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors" />
                        <input
                          {...register("companyName")}
                          placeholder="Ej: Constructora AG"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                        />
                      </div>
                      {errors.companyName && <p className="text-xs text-red-500 ml-1">{errors.companyName.message}</p>}
                    </div>
                  </div>

                  {/* BLOQUE 2: CONTACTO (2 Columnas) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1">Correo Corporativo</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors" />
                        <input
                          {...register("email")}
                          placeholder="ana@empresa.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider ml-1">WhatsApp</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors" />
                        <input
                          {...register("whatsapp")}
                          placeholder="809-555-5555"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm"
                        />
                      </div>
                      {errors.whatsapp && <p className="text-xs text-red-500 ml-1">{errors.whatsapp.message}</p>}
                    </div>
                  </div>

                  {/* BLOQUE 3: SERVICIOS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="relative">
                      <select
                        {...register("serviceType")}
                        className="w-full appearance-none px-4 py-3.5 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 outline-none transition-all text-sm text-[#1A1818] cursor-pointer font-medium"
                      >
                        <option value="">Selecciona Servicio...</option>
                        {serviceCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9890] pointer-events-none" />
                      {errors.serviceType && <p className="text-xs text-red-500 mt-1 ml-1">{errors.serviceType.message}</p>}
                    </div>

                    <div className="relative">
                      <select
                        {...register("plan")}
                        disabled={!selectedServiceId}
                        className={`w-full appearance-none px-4 py-3.5 rounded-xl border border-transparent outline-none transition-all text-sm cursor-pointer font-medium ${
                          !selectedServiceId 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "bg-[#F9F8F6] focus:bg-white focus:border-[#FF4D00]/30 text-[#1A1818]"
                        }`}
                      >
                        <option value="">
                          {selectedServiceId ? "Selecciona Plan..." : "Elige servicio primero"}
                        </option>
                        {availablePlans.map((plan) => (
                          <option key={plan.id} value={plan.name}>{plan.name}</option>
                        ))}
                      </select>
                      {!selectedServiceId ? (
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      ) : (
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9890] pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* NOTAS */}
                  <div>
                    <textarea
                      {...register("notes")}
                      placeholder="Cuéntanos brevemente qué necesitas..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 focus:ring-4 focus:ring-[#FF4D00]/5 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  {/* BOTÓN */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1A1818] hover:bg-[#FF4D00] text-white py-4 px-6 text-sm font-bold tracking-wide transition-all duration-300 shadow-lg hover:shadow-[#FF4D00]/25 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed uppercase"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Procesando...
                      </>
                    ) : (
                      "Solicitar Cotización"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-3xl font-medium text-[#1A1818] mb-4">¡Recibido!</h3>
                  <p className="text-[#6F6B65] mb-8 max-w-md mx-auto">
                    ¡Gracias! <strong>{watch("clientName")}</strong>. Hemos enviado un e-mail de confirmación. Te contactaremos pronto.
                  </p>
                  
                  <button
                    onClick={() => { setIsSuccess(false); reset(); }}
                    className="text-sm font-medium text-[#1A1818] underline underline-offset-4 hover:text-[#FF4D00] transition-colors"
                  >
                    Nueva solicitud
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

