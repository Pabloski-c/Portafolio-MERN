import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// --- CONFIGURACIÓN ---
const GITHUB_USERNAME = "Pabloski-c"; // Usuario de GitHub del cual se obtendrán los repositorios.

/**
 * Componente de Proyectos.
 * 
 * Obtiene los repositorios públicos de un usuario de GitHub a través de su API,
 * los filtra para mostrar los más relevantes y los presenta en una cuadrícula de tarjetas.
 * Cada tarjeta muestra información clave del proyecto y enlaces al código y/o demo.
 */
const Projects = () => {
  // --- ESTADOS ---
  const [repos, setRepos] = useState([]); // Almacena los repositorios filtrados.
  const [loading, setLoading] = useState(true); // Indica si los datos se están cargando.

  useEffect(() => {
    /**
     * Obtiene y filtra los repositorios de GitHub.
     */
    const fetchRepos = async () => {
      try {
        // Petición a la API de GitHub para obtener los repositorios, ordenados por la última actualización.
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const data = await response.json();

        // --- LÓGICA DE FILTRADO ---
        const filteredRepos = data.filter(repo => {
          // Criterio 1: No debe ser un 'fork' (un repositorio copiado de otro usuario).
          const isNotFork = !repo.fork; 
          // Criterio 2: Debe tener una descripción (para asegurar que el proyecto está documentado).
          const hasDescription = repo.description; 
          // Criterio opcional: se podría filtrar por 'topics' si se quisiera más granularidad.
          // Ejemplo: repo.topics.includes('portfolio')
          
          return isNotFork && hasDescription;
        });

        // Limita la cantidad de repositorios a mostrar (los 6 más recientes que pasaron el filtro).
        setRepos(filteredRepos.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez.

  return (
    <section className="py-20 bg-dark-bg text-white px-5" id="proyectos">
      <div className="container mx-auto">
        
        {/* Título de la sección */}
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

        {/* Estado de carga */}
        {loading ? (
          <div className="text-center text-neon-green font-mono animate-pulse">
            Cargando datos del sistema...
          </div>
        ) : (
          /* Cuadrícula de tarjetas de proyecto */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                // Animación de entrada para cada tarjeta.
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-[#111] p-6 rounded-lg border border-gray-800 hover:border-neon-green transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] flex flex-col justify-between h-full"
              >
                <div>
                  {/* Cabecera de la tarjeta */}
                  <div className="flex justify-between items-start mb-4">
                    <FaCode className="text-2xl text-neon-green" />
                    {/* Contador de estrellas del repositorio */}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FaStar className="text-yellow-500" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>

                  {/* Contenido principal de la tarjeta */}
                  <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-neon-green transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {repo.description || "Sin descripción disponible."}
                  </p>
                </div>

                {/* Pie de la tarjeta */}
                <div>
                  {/* Muestra el lenguaje de programación principal */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.language && (
                      <span className="px-2 py-1 text-xs font-bold border border-gray-600 rounded text-gray-300">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  {/* Enlaces al código fuente y a la demo (si existe) */}
                  <div className="flex gap-4 mt-auto pt-4 border-t border-gray-800">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon-green transition-colors"
                    >
                      <FaGithub /> Código
                    </a>
                    {/* El enlace a la demo solo se muestra si la propiedad 'homepage' existe en el repo */}
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