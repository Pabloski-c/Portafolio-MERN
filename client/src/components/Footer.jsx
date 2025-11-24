import React from 'react';
import { FaHeart, FaCode } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-500 py-8 border-t border-gray-900 text-center font-mono text-sm">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="flex items-center gap-2">
          <FaCode className="text-neon-green" />
          Desarrollado por <span className="text-white font-bold">Pablo Torres Lell</span>
        </p>

        <p>© {year} Todos los derechos reservados.</p>

        <p className="flex items-center gap-2">
          Hecho con <FaHeart className="text-red-500 animate-pulse" /> y MERN Stack
        </p>
      </div>
    </footer>
  );
};

export default Footer;