import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectConfig } from '../constants/projectConfig';
import { useSettings } from '../context/SettingsContext';
import styles from './ProjectCard.module.css';

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
      className={styles.cardContainer}
    >
      <div className={styles.contentWrapper}>
        
        <div className={styles.header}>
          <h3 
            className={styles.title}
            style={{ color: config.color }}
          >
            {repo.name}
          </h3>
          <p 
            className={styles.subtitle}
            style={{ color: config.accent }}
          >
            {t.projectSubtitles[repo.name] || t.projectSubtitles.default}
          </p>
          
          <p 
            className={styles.description}
            style={{ color: config.color }}
          >
            {repo.description || t.projectCard.noDescription}
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <div className={styles.overlay}>
             <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.btnCode}
              >
                <FaGithub /> {t.projectCard.codeButton}
              </a>
              {repo.homepage && (
                <a 
                  href={repo.homepage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.btnDemo}
                >
                  <FaExternalLinkAlt /> {t.projectCard.demoButton}
                </a>
              )}
          </div>
          
          <img 
            src={config.image} 
            alt={repo.name} 
            className={styles.projectImage}
          />
        </div>

        <div className={styles.tagsList}>
          {repo.language && (
            <span className={styles.tagPill}>
              {repo.language}
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
