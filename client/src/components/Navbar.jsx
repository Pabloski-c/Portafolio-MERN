import React, { useState } from 'react';
import { FaBars, FaTimes, FaCode } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: 1, text: 'Inicio', href: '#' }, // href='#' lleva al inicio de la página
    { id: 4, text: 'Sobre Mí', href: '#sobre-mi' },
    { id: 2, text: 'Proyectos', href: '#proyectos' },
    { id: 3, text: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="text-xl md:text-2xl font-bold font-mono text-white flex items-center gap-2 cursor-pointer">
          <FaCode className="text-neon-green" />
          <span>Pabloski<span className="text-neon-green">Dev</span></span>
        </div>

        {/* LINKS DESKTOP */}
        <ul className="hidden md:flex gap-8 text-sm font-mono tracking-wide">
          {links.map((link) => (
            <li key={link.id}>
              <a 
                href={link.href} 
                className="text-gray-300 hover:text-neon-green transition-colors duration-300 uppercase font-semibold"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>

        {/* BOTÓN MENÚ MOVIL */}
        <div className="md:hidden text-2xl text-white cursor-pointer hover:text-neon-green" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* MENÚ DESPLEGABLE MOVIL */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-dark-bg border-b border-gray-800 flex flex-col items-center py-6 md:hidden shadow-neon">
             {links.map((link) => (
                <a 
                  key={link.id} 
                  href={link.href} 
                  className="py-3 text-gray-300 hover:text-neon-green font-mono uppercase tracking-widest"
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