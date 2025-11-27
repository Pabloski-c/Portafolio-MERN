/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectConfig } from '../constants/projectConfig';

const ProjectCard = ({ repo, setBgColor }) => {
  const ref = useRef(null);
  
  // Detecta cuando el 50% de la tarjeta está visible en el centro del viewport
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  // Busca la config específica o usa la default
  const config = projectConfig[repo.name] || projectConfig["default"];

  // Efecto: Cuando esta tarjeta entra en foco, actualiza el color de fondo del padre
  useEffect(() => {
    if (isInView) {
      setBgColor(config.theme);
    }
  }, [isInView, setBgColor, config.theme]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col justify-center items-center py-20 px-4 md:px-10"
    >
      <div className="w-full max-w-5xl">
        
        {/* --- HEADER DEL PROYECTO --- */}
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-6xl font-bold font-mono text-white mb-4 tracking-tighter">
            {repo.name}
          </h3>
          <p className="text-xl md:text-2xl text-neon-green font-mono uppercase tracking-widest mb-6">
            {config.subtitle}
          </p>
          
          {/* --- DESCRIPCIÓN MEJORADA --- */}
          {/* Cambios: text-gray-200 (más claro), font-medium (más grueso), text-lg (más grande) */}
          <p className="text-gray-200 font-medium max-w-3xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-sm">
            {repo.description || "Sin descripción disponible."}
          </p>
        </div>

        {/* --- VISUAL DEL PROYECTO (IMAGEN) --- */}
        <div className="relative group w-full mb-12 rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-[#111]">
          {/* Overlay con botones (aparece al hover) */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-sm z-10">
             <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neon-green hover:scale-105 transition-all flex items-center gap-2"
              >
                <FaGithub /> Código
              </a>
              {repo.homepage && (
                <a 
                  href={repo.homepage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all flex items-center gap-2"
                >
                  <FaExternalLinkAlt /> Demo
                </a>
              )}
          </div>
          
          <img 
            src={config.image} 
            alt={repo.name} 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* --- FOOTER DEL PROYECTO (TECNOLOGÍAS) --- */}
        <div className="flex flex-wrap justify-center gap-4">
          {repo.language && (
            <span className="px-4 py-2 border border-white/20 rounded-full text-sm font-mono text-gray-300 backdrop-blur-md">
              {repo.language}
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
