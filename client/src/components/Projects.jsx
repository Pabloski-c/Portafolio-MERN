import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import SideTechStack from './SideTechStack';
import { useSettings } from '../context/SettingsContext';
import styles from './Projects.module.css';

// --- CONFIGURACIÓN ---
const GITHUB_USERNAME = "Pabloski-c";
const MAX_REPOS_TO_SHOW = 5;

// LISTA NEGRA: No queremos mostrarlos
const IGNORED_REPOS = ["Pabloski-c"]; 

// LISTA BLANCA: Forks que quieres mostrar
const SHOW_FORKS = ["HermanosJota"];

/**
 * Componente principal de la sección de Proyectos.
 * Orquesta la obtención de datos y el renderizado de la lista de proyectos.
 */
const Projects = () => {
  const { t } = useSettings();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState("#0a0a0a");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const data = await response.json();

        const filteredRepos = data.filter(repo => {
          const isNotFork = !repo.fork || SHOW_FORKS.includes(repo.name); 
          
          const hasDescription = repo.description;
          const isNotIgnored = !IGNORED_REPOS.includes(repo.name);

          return isNotFork && hasDescription && isNotIgnored;
        });

        // Tomamos los N más recientes (definido en MAX_REPOS_TO_SHOW)
        setRepos(filteredRepos.slice(0, MAX_REPOS_TO_SHOW));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <motion.section 
      id="proyectos"
      className={styles.projectsSection}
      animate={{ backgroundColor: bgColor }}
    >
      {/* Contenedor Flex para: BarraIzq - Contenido - BarraDer */}
      <div className={styles.layoutWrapper}>
        
        {/* --- BARRA IZQUIERDA (Sticky) --- */}
        <div className={styles.stickySidebar}>
          <SideTechStack direction="normal" />
        </div>

        {/* --- CONTENIDO CENTRAL (Proyectos) --- */}
        <div className={`container ${styles.mainContent}`}>
          
          <div className={styles.header}>
            <h2 
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: t.projects.title }}
            />
          </div>

          {loading ? (
            <div className={styles.loading}>
              {t.projects.loading}
            </div>
          ) : (
            <div className={styles.projectsList}>
              {repos.map((repo) => (
                <ProjectCard 
                  key={repo.id} 
                  repo={repo} 
                  setBgColor={setBgColor} 
                />
              ))}
            </div>
          )}
        </div>

        {/* --- BARRA DERECHA (Sticky) --- */}
        <div className={styles.stickySidebar}>
          <SideTechStack direction="reverse" />
        </div>

      </div>
    </motion.section>
  );
};

export default Projects;
