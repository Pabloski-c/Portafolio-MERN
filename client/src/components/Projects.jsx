import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const GITHUB_USERNAME = "Pabloski-c";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Pedimos los repos ordenados por última actualización
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const data = await response.json();

        // --- FILTROS ---
        const filteredRepos = data.filter(repo => {
          // 1. Que no sea un fork
          const isNotFork = !repo.fork; 
          // 2. Que tenga descripción (opcional)
          const hasDescription = repo.description; 
          // 3. (OPCIONAL) Usando topics: repo.topics.includes('portfolio')
          
          return isNotFork && hasDescription;
        });

        // Tomamos los primeros 6 repositorios filtrados
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
        
        {/* Título de Sección */}
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

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-neon-green font-mono animate-pulse">
            Cargando datos del sistema...
          </div>
        ) : (
          /* Grid de Proyectos */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-[#111] p-6 rounded-lg border border-gray-800 hover:border-neon-green transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] flex flex-col justify-between h-full"
              >
                <div>
                  {/* Header Card */}
                  <div className="flex justify-between items-start mb-4">
                    <FaCode className="text-2xl text-neon-green" />
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FaStar className="text-yellow-500" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-neon-green transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {repo.description || "Sin descripción disponible."}
                  </p>
                </div>

                {/* Footer Card */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Lenguaje Principal */}
                    {repo.language && (
                      <span className="px-2 py-1 text-xs font-bold border border-gray-600 rounded text-gray-300">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 mt-auto pt-4 border-t border-gray-800">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon-green transition-colors"
                    >
                      <FaGithub /> Código
                    </a>
                    {repo.homepage && (
                      <a 
                        href={repo.homepage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon-green transition-colors"
                      >
                        <FaExternalLinkAlt /> Demo
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