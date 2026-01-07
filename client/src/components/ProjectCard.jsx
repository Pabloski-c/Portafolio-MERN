/**
 * @file ProjectCard.jsx
 * @description Componente para mostrar un único proyecto con detalles obtenidos de un objeto de repositorio.
 * Cambia el color de fondo de un elemento padre cuando se desplaza a la vista.
 */
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectConfig } from '../constants/projectConfig';
import { useSettings } from '../context/SettingsContext';

/**
 * Muestra una tarjeta para un único proyecto.
 * 
 * @param {object} props - Las props del componente.
 * @param {object} props.repo - El objeto del repositorio, probablemente de una fuente como la API de GitHub.
 * @param {string} props.repo.name - El nombre del repositorio.
 * @param {string} props.repo.description - La descripción del repositorio.
 * @param {string} props.repo.html_url - La URL al código fuente del repositorio.
 * @param {string} [props.repo.homepage] - La URL opcional a la demostración del proyecto desplegado.
 * @param {string} [props.repo.language] - El lenguaje de programación principal del repositorio.
 * @param {function} props.setBgColor - Una función de callback para actualizar el color de fondo de un componente padre.
 * @returns {JSX.Element} El componente de tarjeta de proyecto renderizado.
 */
const ProjectCard = ({ repo, setBgColor }) => {
  const { t } = useSettings();
  const ref = useRef(null);
  
  // El hook useInView detecta si el componente está en el viewport.
  // El margen de "-50%" significa que se considera "en vista" solo cuando está en el centro vertical de la pantalla.
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  // Obtiene la configuración específica para este proyecto o usa la configuración por defecto como fallback.
  const config = projectConfig[repo.name] || projectConfig["default"];

  // Efecto que se activa cuando el componente entra o sale del área central de la vista.
  // Si está en el centro, llama a setBgColor para cambiar el fondo del componente padre.
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
        
        <div className="text-center mb-12">
          <h3 
            className="text-4xl md:text-6xl font-bold font-mono text-white mb-4 tracking-tighter"
            style={{ color: config.color }}
          >
            {repo.name}
          </h3>
          <p 
            className="text-xl md:text-2xl text-neon-green font-mono uppercase tracking-widest mb-6"
            style={{ color: config.accent }}
          >
            {t.projectSubtitles[repo.name] || t.projectSubtitles.default}
          </p>
          
          <p 
            className="text-gray-200 font-medium max-w-3xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-sm"
            style={{ color: config.color }}
          >
            {repo.description || t.projectCard.noDescription}
          </p>
        </div>

        <div className="relative group w-full mb-12 rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-[#111]">
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-sm z-10">
             <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neon-green hover:scale-105 transition-all flex items-center gap-2"
              >
                <FaGithub /> {t.projectCard.codeButton}
              </a>
              {repo.homepage && (
                <a 
                  href={repo.homepage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all flex items-center gap-2"
                >
                  <FaExternalLinkAlt /> {t.projectCard.demoButton}
                </a>
              )}
          </div>
          
          <img 
            src={config.image} 
            alt={repo.name} 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

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
