import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const GITHUB_USERNAME = "Pabloski-c";

/**
 * Componente Projects.
 * 
 * Muestra una selección de los proyectos más recientes de un usuario de GitHub.
 * 
 * - Realiza una llamada a la API de GitHub para obtener los repositorios del usuario especificado en `GITHUB_USERNAME`.
 * - Filtra los repositorios para mostrar solo aquellos que no son 'forks' y que tienen una descripción.
 * - Muestra los 6 proyectos más recientes según la fecha de actualización.
 * - Presenta cada proyecto en una tarjeta con su nombre, descripción, estrellas, lenguaje principal y enlaces al código y al 'demo' (si está disponible).
 * - Muestra un estado de "cargando" mientras se obtienen los datos.
 */
const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const data = await response.json();

        const filteredRepos = data.filter(repo => {
          const isNotFork = !repo.fork; 
          const hasDescription = repo.description; 
          return isNotFork && hasDescription;
        });

        setRepos(filteredRepos.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section className="py-20 bg-dark-bg text-white px-5" id="proyectos">
      <div className="container mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-neon-green inline-block border-b-4 border-neon-green pb-2">
            &lt;Proyectos /&gt;
          </h2>
          <p className="text-gray-400 mt-4">Extraídos directamente de mi API de GitHub</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-neon-green font-mono animate-pulse">
            Cargando datos del sistema...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] flex flex-col justify-between h-full"
              >
                <div>
                  {/* --- HEADER: Icono Izquierda / Estrella Derecha --- */}
                  {/* Cambiamos 'justify-between' por 'flex' normal */}
                  <div className="flex items-center pb-4 mb-4 border-b border-gray-800">
                    
                    {/* Icono de Código (Pegado a la izquierda) */}
                    <FaCode className="text-2xl text-neon-green" />

                    {/* Estrella (Empujada a la derecha con ml-auto) */}
                    {/* El gap-2 asegura que el número se aleje lo justo de la estrella */}
                    <div className="ml-auto flex items-center gap-2 text-sm text-gray-400 font-mono">
                      <FaStar className="text-yellow-500" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>

                  {/* Título y Descripción */}
                  <h3 className="text-xl font-bold font-mono mb-3 text-white group-hover:text-neon-green transition-colors truncate">
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {repo.description || "Sin descripción disponible."}
                  </p>
                </div>

                <div>
                  {/* --- TECNOLOGÍAS --- */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {repo.language && (
                      <span className="px-3 py-1 text-xs font-semibold border border-neon-green/30 bg-neon-green/5 text-neon-green rounded-full w-fit">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  {/* --- BOTONES --- */}
                  <div className="flex gap-3 pt-5 border-t border-gray-800">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold border border-gray-600 rounded-lg text-gray-300 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 transition-all w-fit"
                    >
                      <FaGithub className="text-sm" /> Código
                    </a>
                    
                    {repo.homepage && (
                      <a 
                        href={repo.homepage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold border border-gray-600 rounded-lg text-gray-300 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 transition-all w-fit"
                      >
                        <FaExternalLinkAlt className="text-sm" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;