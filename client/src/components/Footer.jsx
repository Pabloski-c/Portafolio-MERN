import React from 'react';
import { FaHeart, FaCode } from 'react-icons/fa';

/**
 * Componente del pie de página.
 * 
 * Muestra información de copyright, el nombre del desarrollador y las tecnologías utilizadas.
 * El año se actualiza dinámicamente para reflejar el año actual.
 */
const Footer = () => {
  // Obtiene el año actual para mostrarlo en el pie de página.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-500 py-8 border-t border-gray-900 text-center font-mono text-sm">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Información del desarrollador */}
        <p className="flex items-center gap-2">
          <FaCode className="text-neon-green" />
          Desarrollado por <span className="text-white font-bold">Pablo Torres Lell</span>
        </p>

        {/* Copyright con año dinámico */}
        <p>© {year} Todos los derechos reservados.</p>

        {/* Tecnologías utilizadas */}
        <p className="flex items-center gap-2">
          Hecho con <FaHeart className="text-red-500 animate-pulse" /> y MERN Stack
        </p>
      </div>
    </footer>
  );
};

export default Footer;