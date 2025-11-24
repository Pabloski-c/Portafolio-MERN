import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

// --- CONFIGURACIÓN ---
const GITHUB_USERNAME = "Pabloski-c";

const Hero = () => {
  // URL automática de tu foto de perfil
  const profileImage = `https://github.com/${GITHUB_USERNAME}.png`;

  return (
    <section className="min-h-screen bg-dark-bg text-white flex items-center justify-center px-5 relative overflow-hidden">
      
      {/* Fondo con efecto de grilla sutil (Opcional para estilo 'Tech') */}
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

          {/* Botones de Acción */}
          <div className="flex gap-4 justify-center md:justify-start pt-4">
            <button className="px-8 py-3 border-2 border-neon-green text-neon-green font-mono hover:bg-neon-green hover:text-black transition-all duration-300 rounded shadow-neon font-bold">
              Contáctame
            </button>
            
            <button className="px-8 py-3 border-2 border-gray-600 text-gray-300 font-mono hover:border-white hover:text-white transition-all duration-300 rounded flex items-center gap-2">
              <FaFileDownload /> CV
            </button>
          </div>

          {/* Redes Sociales */}
          <div className="flex gap-6 justify-center md:justify-start mt-8 text-3xl">
            <a href="#" className="text-gray-400 hover:text-neon-green hover:scale-110 transition-transform">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green hover:scale-110 transition-transform">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: FOTO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center relative"
        >
          {/* Círculo decorativo detrás (Efecto Aura) */}
          <div className="absolute w-72 h-72 bg-neon-green rounded-full blur-[100px] opacity-20 animate-pulse"></div>
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-br from-gray-800 to-black border-2 border-neon-green shadow-neon overflow-hidden">
             <img 
               src={profileImage} 
               alt="Profile" 
               className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"
             />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;