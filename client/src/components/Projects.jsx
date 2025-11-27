import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import SideTechStack from './SideTechStack';

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
 *
 * Características:
 * - Gestiona el estado de los repositorios (`repos`), el estado de carga (`loading`) y el color de fondo dinámico (`bgColor`).
 * - Realiza una llamada a la API de GitHub para obtener los repositorios del usuario.
 * - Filtra los repositorios para mostrar solo los más relevantes:
 *   - Excluye repositorios en la lista negra `IGNORED_REPOS`.
 *   - Excluye repositorios sin descripción.
 *   - Por defecto, excluye forks, pero permite forks específicos listados en `SHOW_FORKS`.
 * - Renderiza una lista vertical de componentes `ProjectCard`.
 * - La sección principal (`motion.section`) anima su color de fondo (`backgroundColor`) según el `ProjectCard` visible.
 */
const Projects = () => {
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

        // Tomamos los 5 más recientes
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
      className="transition-colors duration-700 ease-in-out relative min-h-screen"
      animate={{ backgroundColor: bgColor }}
    >
      {/* Contenedor Flex para: BarraIzq - Contenido - BarraDer */}
      <div className="flex justify-between">
        
        {/* --- BARRA IZQUIERDA (Sticky) --- */}
        <div className="hidden lg:block sticky top-0 h-screen z-20">
          <SideTechStack direction="normal" />
        </div>

        {/* --- CONTENIDO CENTRAL (Proyectos) --- */}
        <div className="flex-1 container mx-auto px-4 md:px-10 py-10">
          
          <div className="text-center pt-12 pb-4">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-white inline-block border-b-4 border-neon-green pb-2">
              &lt;Proyectos /&gt;
            </h2>
          </div>

          {loading ? (
            <div className="h-screen flex items-center justify-center text-neon-green font-mono animate-pulse">
              Inicializando galería de proyectos...
            </div>
          ) : (
            <div className="flex flex-col relative z-10">
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
        <div className="hidden lg:block sticky top-0 h-screen z-20">
          <SideTechStack direction="reverse" />
        </div>

      </div>
    </motion.section>
  );
};

export default Projects;
