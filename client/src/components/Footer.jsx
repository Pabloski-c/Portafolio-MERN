import React from 'react';
import { FaHeart, FaCode } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';

/**
 * Componente del pie de página.
 * 
 * Muestra información de copyright, el nombre del desarrollador y las tecnologías utilizadas.
 * El año se actualiza dinámicamente para reflejar el año actual.
 */
const Footer = () => {
  const { t } = useSettings();
  // Obtiene el año actual para mostrarlo en el pie de página.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-500 py-8 border-t border-gray-900 text-center font-mono text-sm">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Información del desarrollador */}
        <p className="flex items-center gap-2">
          <FaCode className="text-neon-green" />
          {t.footer.developedBy} <span className="text-white font-bold">{t.footer.name}</span>
        </p>

        {/* Copyright con año dinámico */}
        <p>{t.footer.copyright.replace('{year}', year)}</p>

        {/* Tecnologías utilizadas */}
        <p className="flex items-center gap-2">
          {t.footer.madeWith} <FaHeart className="text-red-500 animate-pulse" /> {t.footer.tool}
        </p>
      </div>
    </footer>
  );
};

export default Footer;