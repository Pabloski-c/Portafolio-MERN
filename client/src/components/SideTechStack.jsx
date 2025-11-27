import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiVite } from 'react-icons/si';

// Array de tecnologías a mostrar en la barra lateral.
// Cada objeto contiene el componente del icono.
const technologies = [
  { icon: <FaReact /> },
  { icon: <FaNodeJs /> },
  { icon: <SiExpress /> },
  { icon: <SiMongodb /> },
  { icon: <FaJs /> },
  { icon: <SiTailwindcss /> },
  { icon: <SiVite /> },
  { icon: <FaHtml5 /> },
  { icon: <FaCss3Alt /> },
  { icon: <FaGitAlt /> },
];

/**
 * Componente SideTechStack.
 * 
 * Renderiza una barra lateral decorativa con una columna de iconos de tecnologías 
 * que se desplazan infinitamente en un bucle.
 * 
 * @param {object} props - Propiedades del componente.
 * @param {'normal' | 'reverse'} [props.direction="normal"] - La dirección de la animación del scroll.
 *   - "normal": Los iconos se desplazan hacia arriba.
 *   - "reverse": Los iconos se desplazan hacia abajo.
 */
const SideTechStack = ({ direction = "normal" }) => {
  return (
    <div className="h-screen w-24 flex flex-col items-center justify-center relative z-20">
      <div 
        className="h-full w-full flex flex-col justify-center overflow-hidden"
        // Aplica una máscara CSS para que los iconos aparezcan y desaparezcan suavemente en los bordes.
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' 
        }}
      >
        <motion.div
          className="flex flex-col gap-16 py-10 items-center"
          initial={{ y: direction === "normal" ? "0%" : "-40%" }}
          animate={{ y: direction === "normal" ? "-40%" : "0%" }}
          // La transición define una animación lineal, de larga duración, que se repite infinitamente
          // en modo "espejo" (va y vuelve) para un efecto de scroll continuo y suave.
          transition={{ 
            ease: "linear", 
            duration: 35,
            repeat: Infinity, 
            repeatType: "mirror"
          }}
        >
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="text-4xl text-white/20 hover:text-white transition-all duration-300 filter drop-shadow-lg cursor-pointer hover:scale-110"
            >
              {tech.icon}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SideTechStack;