import React, { useState } from 'react';
import { FaBars, FaTimes, FaCode, FaGlobe } from 'react-icons/fa';
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

  // Array de objetos que define los enlaces de navegación.
  const links = [
    { id: 1, text: t.navbar.home, href: '#' }, // href='#' lleva al inicio de la página
    { id: 4, text: t.navbar.about, href: '#sobre-mi' },
    { id: 2, text: t.navbar.projects, href: '#proyectos' },
    { id: 3, text: t.navbar.contact, href: '#contacto' },
  ];

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
        <ul className="hidden md:flex flex-1 justify-center gap-8 text-sm font-mono tracking-wide">
          {links.map((link) => (
            <li key={link.id}>
              <a 
                href={link.href} 
                className="text-gray-300 hover:text-neon-green transition-colors duration-300 uppercase font-semibold whitespace-nowrap"
              >
                {link.text}
              </a>
            </li>
          ))}
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
              {links.map((link) => (
                <a 
                  key={link.id} 
                  href={link.href} 
                  className="py-4 w-full text-center text-lg text-gray-300 hover:text-neon-green hover:bg-white/5 font-mono uppercase tracking-widest transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </a>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;