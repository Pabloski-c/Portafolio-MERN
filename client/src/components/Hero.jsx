import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// --- CONFIGURACIÓN ---
const GITHUB_USERNAME = "Pabloski-c";
const CV_URL ="https://drive.google.com/file/d/1GlDKJAuPB1h1TTzP1OPbYRX6Omep0a04/view?usp=drive_link";

const Hero = () => {
  // URL automática de tu foto de perfil
  const profileImage = `https://github.com/${GITHUB_USERNAME}.png`;

  return (
    <section className="min-h-screen bg-dark-bg text-white flex items-center justify-center px-5 relative overflow-hidden pt-20 md:pt-0">
      
      {/* Fondo con efecto de grilla sutil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center z-10">
        
        {/* COLUMNA IZQUIERDA: TEXTO */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center md:text-left"
        >
          <h2 className="text-xl md:text-2xl font-mono text-neon-green font-bold tracking-wider">
            &lt;Hola mundo /&gt;
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Soy <span className="text-gray-300">Pablo</span>
          </h1>

          <div className="text-2xl md:text-4xl font-semibold text-gray-400 h-[50px]">
            <span>I'm a </span>
            <TypeAnimation
              sequence={[
                'Full Stack Dev',
                2000,
                'Engineer Student',
                2000,
                'Software Enthusiast',
                2000
              ]}
              wrapper="span"
              speed={50}
              className="text-neon-green border-b-4 border-neon-green"
              repeat={Infinity}
            />
          </div>

          <p className="text-gray-400 max-w-lg mx-auto md:mx-0 text-lg leading-relaxed">
            Transformando ideas en código. Especializado en el stack MERN y apasionado por el desarrollo.
          </p>

          {/* --- SECCIÓN 1: ACCIONES PRINCIPALES --- */}
          {/* w-max hace que el contenedor se ajuste al contenido, y gap-4 los separa */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <a 
              href="#contacto"
              className="w-max px-6 py-3 border-2 border-neon-green text-neon-green font-mono hover:bg-neon-green hover:text-black transition-all duration-300 rounded shadow-neon font-bold text-sm md:text-base flex items-center justify-center"
            >
              Contáctame
            </a>
            
            <a 
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-max px-6 py-3 border-2 border-gray-600 text-gray-300 font-mono hover:border-white hover:text-white transition-all duration-300 rounded flex items-center gap-2 text-sm md:text-base"
            >
              <FaFileDownload /> CV
            </a>
          </div>

          {/* --- SECCIÓN 2: REDES SOCIALES --- */}
          <div className="mt-8">
            {/* Título separador */}
            <p className="text-sm text-gray-500 font-mono mb-4 uppercase tracking-widest">
              Redes Sociales
            </p>

            {/* Botones */}
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="https://github.com/Pabloski-c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-lg bg-[#111] text-gray-400 text-xl hover:border-neon-green hover:text-neon-green hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all duration-300"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/pablo-a-torres-lell/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-lg bg-[#111] text-gray-400 text-xl hover:border-neon-green hover:text-neon-green hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all duration-300"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

        </motion.div>

        {/* COLUMNA DERECHA: FOTO (Grande) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-centerMQ relative"
        >
          {/* Círculo decorativo detrás (Aura) */}
          <div className="absolute w-80 h-80 md:w-96 md:h-96 bg-neon-green rounded-full blur-[100px] opacity-20 animate-pulse"></div>
          
          {/* Imagen de perfil grande */}
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-full p-2 bg-gradient-to-br from-gray-800 to-black border-2 border-neon-green shadow-neon overflow-hidden">
             <img 
               src={profileImage} 
               alt="Profile" 
               className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0"
             />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;