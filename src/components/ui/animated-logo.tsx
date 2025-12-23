'use client';

import { motion, Variants } from 'framer-motion';

// EMBER GLASS: Logo de fuego como sello premium
export const FireLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  
  const flameVariants: Variants = {
    idle: {
      scale: [1, 1.03, 1],
      opacity: [0.95, 1, 0.95],
      filter: [
        'drop-shadow(0 0 4px rgba(255, 77, 0, 0.3))',
        'drop-shadow(0 0 10px rgba(255, 77, 0, 0.5))',
        'drop-shadow(0 0 4px rgba(255, 77, 0, 0.3))'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      filter: 'drop-shadow(0 0 15px rgba(255, 77, 0, 0.6))',
      transition: { duration: 0.3 }
    }
  };

  const coreVariants: Variants = {
    idle: {
      y: [0, -1, 0],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`}
      whileHover="hover"
      initial="idle"
      animate="idle"
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        variants={flameVariants}
      >
        {/* Llama principal - Magma Orange */}
        <motion.path
          d="M13.5 3C13.5 3 10.5 6.5 10.5 10C10.5 11.5 11.5 12.5 12 14.5C10.5 13.5 9 12 9 10C9 8 10 6 10 6C6 8.5 5 12 5 14.5C5 18.5 8 21.5 12 21.5C16 21.5 19 18.5 19 14.5C19 10.5 13.5 3 13.5 3Z"
          fill="#FF4D00"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Núcleo interno - Más claro */}
        <motion.path
          d="M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.5 12 12 12C10.5 12 9 14.3431 9 16C9 17.6569 10.3431 19 12 19Z"
          fill="#FF6B2C"
          fillOpacity="0.7"
          variants={coreVariants}
        />
      </motion.svg>
      
      {/* Glow sutil detrás */}
      <div className="absolute inset-0 bg-[#FF4D00] blur-xl opacity-15 rounded-full z-[-1]" />
    </motion.div>
  );
};
