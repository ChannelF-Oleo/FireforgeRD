"use client";

import { MotionConfig, motion, useAnimationControls, useInView, type Variants } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

// Preset "Stagger List (Standard)" del design system (--motion 4).
// La skill lo entrega en GSAP: gsap.from('.grid-item', { opacity: 0, scale: 0.92,
// y: 16, duration: 0.4, stagger: 0.06, ease: 'back.out(1.4)' }).
// Aquí se traduce a framer-motion (ya instalado) en vez de añadir GSAP.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    // Aproximación de back.out(1.4) con una cúbica con overshoot.
    transition: { duration: 0.4, ease: [0.34, 1.4, 0.64, 1] },
  },
};

export function StaggerGrid({
  children,
  className,
}: {
  children: ReactNode[];
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // El HTML del servidor sale con las tarjetas visibles (initial={false}): con
  // initial="hidden" llevaban opacity 0 en línea y, sin JS, con la hidratación
  // lenta o con un error de hidratación, el grid quedaba vacío. Ya en el
  // cliente, si el grid está por debajo de la pantalla se ocultan antes de
  // pintar para animarlas al entrar; si ya está a la vista se dejan como están.
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) {
      controls.set("hidden");
    }
  }, [controls]);

  useEffect(() => {
    if (inView) void controls.start("show");
  }, [inView, controls]);

  // Siempre el mismo marcado en servidor y cliente (antes, con
  // prefers-reduced-motion se cambiaba a un <ul> plano y la hidratación dejaba
  // las tarjetas invisibles). reducedMotion="user" quita el desplazamiento y la
  // escala y deja el fundido.
  return (
    <MotionConfig reducedMotion="user">
      <motion.ul ref={ref} className={className} variants={container} initial={false} animate={controls}>
        {children.map((c, i) => (
          <motion.li key={i} variants={item}>
            {c}
          </motion.li>
        ))}
      </motion.ul>
    </MotionConfig>
  );
}
