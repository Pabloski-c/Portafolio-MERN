import React, { useState, useEffect, useMemo } from 'react';
import { FaBars, FaTimes, FaCode, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        
        {/* LOGO */}
        <div className="flex-1 flex justify-start">
          <div className="text-xl md:text-2xl font-bold font-mono text-white flex items-center gap-2 cursor-pointer">
            <FaCode className="text-neon-green" />
            <span dangerouslySetInnerHTML={{ __html: t.navbar.logo.replace('Dev', '<span class="text-neon-green">Dev</span>') }} />
          </div>
        </div>

        {/* LINKS DESKTOP - Se muestran solo en pantallas grandes (md y superiores) */}
        <ul className="hidden md:flex flex-1 justify-center gap-8 text-sm font-mono tracking-wide" onMouseLeave={() => setHoveredLink(null)}>
          {links.map((link) => {
            const isActive = activeSection === link.href;
            const isHovered = hoveredLink === link.href;
            const isCurrentIndicator = isHovered || (isActive && hoveredLink === null);

            return (
              <li 
                key={link.id} 
                className="relative"
                onMouseEnter={() => setHoveredLink(link.href)}
              >
                <a 
                  href={link.href} 
                  className={`relative z-10 transition-colors duration-300 uppercase font-semibold whitespace-nowrap pb-1 ${
                    isActive || isHovered
                      ? 'text-neon-green' 
                      : 'text-gray-300'
                  }`}
                >
                  {link.text}
                </a>
                
                {/* Animación de la línea verde (Underline Magic) */}
                {isCurrentIndicator && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-neon-green"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* CONTROLES DERECHA */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Botón de Idioma */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray-300 hover:text-neon-green transition-colors p-2"
            title={language === 'es' ? "Switch to English" : "Cambiar a Español"}
          >
            <FaGlobe className="text-lg" />
            <span className="font-mono text-sm uppercase font-semibold hidden sm:inline">
              {language === 'es' ? 'ES' : 'EN'}
            </span>
          </button>

          {/* BOTÓN MENÚ MOVIL - Se muestra solo en pantallas pequeñas (inferiores a md) */}
          <div className="md:hidden text-2xl text-white cursor-pointer hover:text-neon-green" onClick={() => setIsOpen(!isOpen)}>
            {/* Cambia el icono dependiendo de si el menú está abierto o cerrado */}
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MOVIL - Se muestra solo si `isOpen` es true */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-xl border-b border-gray-800 flex flex-col items-center py-8 md:hidden shadow-neon z-50">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a 
                    key={link.id} 
                    href={link.href} 
                    className={`py-4 w-full text-center text-lg font-mono uppercase tracking-widest transition-all ${
                      isActive ? 'text-neon-green bg-white/5' : 'text-gray-300 hover:text-neon-green hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`pb-1 border-b-2 ${isActive ? 'border-neon-green' : 'border-transparent'}`}>
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