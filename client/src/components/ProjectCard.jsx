/**
 * @file ProjectCard.jsx
 * @description A component to display a single project with details fetched from a repository object.
 * It changes the background color of a parent element when it scrolls into view.
 */
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectConfig } from '../constants/projectConfig';

/**
 * Displays a card for a single project.
 * 
 * @param {object} props - The component props.
 * @param {object} props.repo - The repository object, likely from a source like the GitHub API.
 * @param {string} props.repo.name - The name of the repository.
 * @param {string} props.repo.description - The description of the repository.
 * @param {string} props.repo.html_url - The URL to the repository's source code.
 * @param {string} [props.repo.homepage] - The optional URL to the deployed project demo.
 * @param {string} [props.repo.language] - The primary programming language of the repository.
 * @param {function} props.setBgColor - A callback function to update the background color of a parent component.
 * @returns {JSX.Element} The rendered project card component.
 */
const ProjectCard = ({ repo, setBgColor }) => {
  const ref = useRef(null);
  
  // Triggers the view change when the center of the element hits the vertical center of the viewport.
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  const config = projectConfig[repo.name] || projectConfig["default"];

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
            {config.subtitle}
          </p>
          
          <p 
            className="text-gray-200 font-medium max-w-3xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-sm"
            style={{ color: config.color }}
          >
            {repo.description || "Sin descripción disponible."}
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
