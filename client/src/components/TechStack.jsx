import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiVite } from 'react-icons/si';

// Lista de tecnologías (rebote)
const technologies = [
  { name: "React", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "Git", icon: <FaGitAlt /> },
];

/**
 * Componente TechStack.
 * 
 * Muestra una barra horizontal con iconos de tecnologías que se desplaza automáticamente.
 * 
 * - Utiliza `framer-motion` para crear una animación de desplazamiento continuo e infinito con efecto "espejo" (va y vuelve).
 * - Está diseñado para solaparse ligeramente con la sección superior (usando un margen superior negativo) para una transición visual fluida.
 * - Muestra el nombre de la tecnología al pasar el cursor sobre su icono.
 * - Los bordes laterales tienen un degradado para que el efecto de entrada y salida de los iconos sea suave.
 */
const TechStack = () => {
  return (
    <section className="py-6 bg-[#0a0a0a] overflow-hidden relative border-y border-gray-900 -mt-6 z-20">
      
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>

      <div className="flex justify-center">
        
        <motion.div
          className="flex gap-12 sm:gap-16 px-4"
          // ANIMACIÓN DE REBOTE:
          initial={{ x: "0%" }}
          animate={{ x: "-40%" }}
          transition={{ 
            ease: "linear", 
            duration: 20,
            repeat: Infinity, 
            repeatType: "mirror"
          }}
        >
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center gap-2 group min-w-[max-content] cursor-default"
            >
              <div className="text-3xl sm:text-4xl text-gray-600 group-hover:text-neon-green transition-colors duration-300 filter drop-shadow-lg">
                {tech.icon}
              </div>
              <span className="text-xs sm:text-sm font-mono text-gray-700 group-hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100 absolute -bottom-6">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
