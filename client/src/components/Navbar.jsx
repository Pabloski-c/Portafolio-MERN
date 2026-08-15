import React, { useState, useEffect, useMemo } from 'react';
import { FaBars, FaTimes, FaCode, FaGlobe } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import styles from './Navbar.module.css';

/**
 * Componente de la barra de navegación principal.
 * 
 * Incluye el logo, los enlaces de navegación para escritorio y un menú desplegable para dispositivos móviles.
 * Utiliza `react-icons` para los iconos y `useState` para gestionar el estado del menú móvil.
 */
const Navbar = () => {
  const { t, language, toggleLanguage } = useSettings();
  // Estado para controlar la visibilidad del menú móvil. `true` si está abierto, `false` si está cerrado.
  const [isOpen, setIsOpen] = useState(false);
  // Estado para saber qué sección está activa según el scroll
  const [activeSection, setActiveSection] = useState('#');
  // Estado para rastrear qué enlace se está enfocando con el ratón
  const [hoveredLink, setHoveredLink] = useState(null);

  // Array de objetos que define los enlaces de navegación.
  const links = useMemo(() => [
    { id: 1, text: t.navbar.home, href: '#' }, // href='#' lleva al inicio de la página
    { id: 4, text: t.navbar.about, href: '#sobre-mi' },
    { id: 2, text: t.navbar.projects, href: '#proyectos' },
    { id: 3, text: t.navbar.contact, href: '#contacto' },
  ], [t]);

  // Hook para detectar el scroll y actualizar la sección activa
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Si estamos en la parte superior (menos de 100px), marcamos inicio como activo
      if (scrollPosition < 100) {
        setActiveSection('#');
        return;
      }

      for (const link of links) {
        if (link.href === '#') continue;
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          // Ajuste de offset para tener en cuenta la altura del navbar
          if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
            setActiveSection(link.href);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Ejecutar una vez al inicio para establecer el estado correcto
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* LOGO */}
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <FaCode className={styles.logoIcon} />
            <span dangerouslySetInnerHTML={{ __html: t.navbar.logo.replace('Dev', '<span class="text-neon-green">Dev</span>') }} />
          </div>
        </div>

        {/* LINKS DESKTOP - Se muestran solo en pantallas grandes (md y superiores) */}
        <ul className={styles.desktopNav} onMouseLeave={() => setHoveredLink(null)}>
          {links.map((link) => {
            const isActive = activeSection === link.href;
            const isHovered = hoveredLink === link.href;
            const isCurrentIndicator = isHovered || (isActive && hoveredLink === null);

            return (
              <li 
                key={link.id} 
                className={styles.navItem}
                onMouseEnter={() => setHoveredLink(link.href)}
              >
                <a 
                  href={link.href} 
                  className={`${styles.navLink} ${isActive || isHovered ? styles.navLinkActive : ''}`}
                >
                  {link.text}
                </a>
                
                {/* Animación de la línea verde (Underline Magic) */}
                {isCurrentIndicator && (
                  <motion.div
                    layoutId="navbar-underline"
                    className={styles.navUnderline}
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* CONTROLES DERECHA */}
        <div className={styles.controls}>
          {/* Botón de Idioma */}
          <button 
            onClick={toggleLanguage}
            className={styles.langBtn}
            title={language === 'es' ? "Switch to English" : "Cambiar a Español"}
          >
            <FaGlobe />
            <span className={styles.langText}>
              {language === 'es' ? 'ES' : 'EN'}
            </span>
          </button>

          {/* BOTÓN MENÚ MOVIL - Se muestra solo en pantallas pequeñas (inferiores a md) */}
          <div className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MOVIL - Se muestra solo si `isOpen` es true */}
        {isOpen && (
          <div className={styles.mobileMenu}>
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a 
                    key={link.id} 
                    href={link.href} 
                    className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`${styles.mobileLinkText} ${isActive ? styles.mobileLinkTextActive : ''}`}>
                      {link.text}
                    </span>
                  </a>
                );
              })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;