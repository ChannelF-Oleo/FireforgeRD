'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FireLogo } from '@/components/ui/animated-logo';
import { MobileMenu } from './mobile-menu';
import { scrollToElement } from '@/lib/utils';
import { styles } from './header.styles';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    setIsMobileOpen(false);
    setActiveSection(sectionId);

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToElement(sectionId);
    }
  }, []);

  return (
    <>
      <header className={styles.header(isScrolled)}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            
            {/* LOGO - Estilo editorial */}
            <motion.div 
              className={styles.logoContainer}
              onClick={() => handleNavClick('hero')}
              whileHover="hover"
              initial="idle"
            >
              <div className={styles.logoIcon}>
                <FireLogo className="w-9 h-9 md:w-10 md:h-10" />
              </div>
              <span className={styles.logoText}>FireforgeRD</span>
            </motion.div>

            {/* NAVEGACIÓN - Elegante y minimalista */}
            <nav className={styles.nav}>
              {['servicios', 'precios', 'faq'].map((item) => {
                const isActive = activeSection === item;
                
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={styles.navLink(isActive)}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>

            {/* ACCIONES */}
            <div className={styles.actions}>
              <Button
                onClick={() => handleNavClick('contact')}
                size="default" 
                className={styles.ctaButton}
              >
                Hablemos
              </Button>

              {/* Menú Móvil */}
              <button 
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={styles.mobileToggle}
                aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <MobileMenu 
            onClose={() => setIsMobileOpen(false)} 
            onNavClick={handleNavClick} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
