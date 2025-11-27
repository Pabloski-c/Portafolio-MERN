import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiVite } from 'react-icons/si';

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

const SideTechStack = ({ direction = "normal" }) => {
  return (
    // Quitamos bg-black/20 y bordes para que sea totalmente limpio
    <div className="h-screen w-24 flex flex-col items-center justify-center relative z-20">
      
      {/* EN LUGAR DE GRADIENTES DE COLOR, USAMOS MÁSCARA CSS.
         Esto asegura que el desvanecimiento funcione sobre CUALQUIER color de fondo.
      */}
      <div 
        className="h-full w-full flex flex-col justify-center overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' 
        }}
      >
        <motion.div
          className="flex flex-col gap-16 py-10 items-center"
          initial={{ y: direction === "normal" ? "0%" : "-40%" }}
          animate={{ y: direction === "normal" ? "-40%" : "0%" }}
          transition={{ 
            ease: "linear", 
            duration: 35, // Un poco más lento para ser más elegante
            repeat: Infinity, 
            repeatType: "mirror"
          }}
        >
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              // CAMBIO DE COLOR: text-white/20
              // Se ve bien sobre negro, marrón, azul, etc.
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