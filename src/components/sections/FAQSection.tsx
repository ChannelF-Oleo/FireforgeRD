"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import Script from 'next/script'; // Importante para el SEO

const faqs = [
  {
    category: "Sobre el Proceso",
    questions: [
      {
        q: "¿Qué tengo que entregarles para empezar?",
        a: "Solo necesitamos tu logo y los textos básicos. ¿No tienes fotos profesionales? No te preocupes, usamos bancos de imágenes premium o coordinamos una sesión (costo adicional)."
      },
      {
        q: "¿En qué tiempo estará lista mi web?",
        a: "Para Landing Pages (One-Page): 5-7 días laborables. Webs Corporativas: 15 días. E-commerce: 20-25 días. Cumplimos los plazos religiosamente."
      },
      {
        q: "¿Puedo ver cómo va quedando?",
        a: "¡Claro! Tendrás 2 revisiones completas durante el proceso para ajustar colores, textos y detalles antes del lanzamiento final."
      }
    ]
  },
  {
    category: "Tecnología y Mantenimiento",
    questions: [
      {
        q: "¿Por qué no usan WordPress?",
        a: "WordPress es popular pero inseguro y lento si no se cuida. Nosotros usamos Next.js (la tecnología de Netflix y Uber) para que tu web cargue instantáneamente y sea imposible de hackear."
      },
      {
        q: "¿Tengo que pagar mensualidades?",
        a: "No obligatoriamente. El pago de desarrollo es único. Solo necesitas renovar tu dominio y hosting anualmente (aprox. RD$ 4,500/año) después del primer año gratis."
      },
      {
        q: "¿Podré cambiar fotos o precios yo mismo?",
        a: "Sí. Te entregamos un panel de control simple (CMS) y te enviamos un video-tutorial de 5 minutos explicando cómo usarlo. Sin depender de ingenieros."
      }
    ]
  },
  {
    category: "Pagos y Seguridad",
    questions: [
      {
        q: "¿Cómo funcionan los pagos?",
        a: "Trabajamos con un esquema estándar: 50% de inicial para comenzar el proyecto y el 50% restante contra entrega, cuando estés satisfecho con el resultado."
      },
      {
        q: "¿Dan factura con valor fiscal?",
        a: "Totalmente. Todos nuestros precios son + ITBIS si requieres Comprobante Fiscal (NCF) para deducir gastos de tu empresa."
      },
      {
        q: "¿Qué pasa si algo falla después de entregar?",
        a: "Tienes 30 días de garantía técnica gratuita. Si hay un error de código o algo deja de funcionar, lo arreglamos sin costo inmediato."
      }
    ]
  }
];

// Generación del Schema JSON-LD para Google
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.flatMap(cat => 
    cat.questions.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  )
};

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F9F8F6] relative overflow-hidden">
      
      {/* --- INYECCIÓN DE SEO --- */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Luz ambiental sutil */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[rgba(255,77,0,0.03)] to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1818]/5 mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#6F6B65]">Resolvemos tus dudas</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1818] mb-6">
            Preguntas
            <span className="bg-gradient-to-r from-[#FF4D00] via-[#FF6B2C] to-[#FF4D00] bg-clip-text text-transparent font-medium"> Frecuentes</span>
          </h2>
          
          <p className="text-base md:text-lg text-[#6F6B65] max-w-2xl mx-auto font-light text-balance">
            Aquí te explicamos cómo trabajamos, sin letras chiquitas ni tecnicismos complicados.
          </p>
        </motion.div>

        {/* ACORDEÓN DE PREGUNTAS */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12 last:mb-0"
            >
              {/* Título de Categoría */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-lg font-medium text-[#1A1818]">
                  {category.category}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-[#1A1818]/10 to-transparent" />
              </div>
              
              {/* Items */}
              {/* LayoutGroup ayuda a que framer motion entienda las relaciones de posición */}
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const itemId = `${categoryIndex}-${index}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <motion.div
                      layout // <--- MAGIA AQUÍ: Permite que los elementos se deslicen suavemente
                      key={itemId}
                      initial={false}
                      className="group"
                    >
                      <Card className={`overflow-hidden border transition-colors duration-300 ${isOpen ? 'border-[#FF4D00]/20 bg-white shadow-sm' : 'border-transparent bg-white/50 hover:bg-white hover:border-[#1A1818]/5'}`}>
                        <CardContent className="p-0">
                          
                          <button
                            onClick={() => toggleItem(itemId)}
                            aria-expanded={isOpen} // Accesibilidad
                            aria-controls={`faq-answer-${itemId}`}
                            className="w-full px-6 py-5 text-left flex justify-between items-start md:items-center gap-4 focus:outline-none"
                          >
                            <span className={`text-sm md:text-base font-medium transition-colors text-balance ${isOpen ? 'text-[#1A1818]' : 'text-[#6F6B65] group-hover:text-[#1A1818]'}`}>
                              {faq.q}
                            </span>
                            
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className={`flex-shrink-0 mt-0.5 md:mt-0 ${isOpen ? 'text-[#FF4D00]' : 'text-[#9C9890]'}`}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.span>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                id={`faq-answer-${itemId}`}
                              >
                                <div className="px-6 pb-6 pt-0">
                                  <p className="text-sm md:text-[15px] leading-relaxed text-[#6F6B65]">
                                    {faq.a}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cierre de Confianza */}
        <div className="text-center mt-20">
          <p className="text-sm text-[#9C9890] mb-4">¿Tienes una pregunta que no está aquí?</p>
          <a 
            href="https://wa.me/18094202288" // Asegúrate de poner tu número real
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm font-medium text-[#FF4D00] hover:text-[#1A1818] transition-colors border-b border-[#FF4D00]/30 hover:border-[#1A1818]"
          >
            Escríbenos directo al WhatsApp
          </a>
        </div>
        
      </div>
    </section>
  );
}
