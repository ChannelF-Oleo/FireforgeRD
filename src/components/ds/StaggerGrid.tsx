"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

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
  // Siempre el mismo marcado: antes, con prefers-reduced-motion se cambiaba a un
  // <ul> plano, pero el servidor no conoce esa preferencia y renderizaba el
  // estado "hidden" (opacity 0); al hidratar el cliente tomaba la otra rama,
  // React no corregía el estilo y las tarjetas quedaban invisibles.
  // reducedMotion="user" quita el desplazamiento y la escala y deja el fundido.
  return (
    <MotionConfig reducedMotion="user">
    <motion.ul
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children.map((c, i) => (
        <motion.li key={i} variants={item}>
          {c}
        </motion.li>
      ))}
    </motion.ul>
    </MotionConfig>
  );
}
