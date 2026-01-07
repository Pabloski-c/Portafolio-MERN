import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

// --- CONFIGURACIÓN ---
// Estas variables facilitan la actualización de datos clave sin tener que buscarlos en el código.
const GITHUB_USERNAME = "Pabloski-c"; // Tu nombre de usuario de GitHub para la foto de perfil.
const CV_URL_ES ="https://drive.google.com/file/d/1-8RXaBkZCyy5PAYSkNyELoqI5iLudvq_/view?usp=drive_link"; // Enlace directo a tu CV en español.
const CV_URL_EN = "https://drive.google.com/file/d/189ZJUJTB2wDjiETTf2i-XXdHgEb3el6y/view?usp=drive_link"; // TODO: Reemplazar con el enlace directo a tu CV en inglés.

/**
 * Componente Hero (sección principal).
 * 
 * Muestra la bienvenida inicial, tu nombre, un título animado, una breve descripción
 * y enlaces a tus redes sociales y CV. Utiliza `framer-motion` para animaciones
 * y `react-type-animation` para el efecto de escritura.
 */
const Hero = () => {
  const { t, language } = useSettings();
  // Construye la URL de la imagen de perfil dinámicamente usando el nombre de usuario de GitHub.
  const profileImage = `https://github.com/${GITHUB_USERNAME}.png`;

  // Selecciona la URL del CV según el idioma actual.
  const cvUrl = language === 'en' ? CV_URL_EN : CV_URL_ES;

  return (
    <section className="min-h-screen bg-dark-bg text-white flex items-center justify-center px-4 sm:px-6 relative overflow-hidden pt-24 md:pt-0"> {/* Padding lateral ajustado */}
      
      {/* Fondo con efecto de grilla sutil y decorativo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Cambiamos gap-10 a gap-8 para tablets */}
      <div className="container mx-auto grid md:grid-cols-2 gap-8 lg:gap-10 items-center z-10">
        
        {/* --- COLUMNA IZQUIERDA: TEXTO Y LLAMADAS A LA ACCIÓN --- */}
        <motion.div 
          // Animación de entrada con Framer Motion: aparece desde la izquierda.
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:space-y-6 text-center md:text-left"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-neon-green font-bold tracking-wider"
            dangerouslySetInnerHTML={{ __html: t.hero.holaMundo }}
          />
          
          {/* Título adaptable: Pequeño en móvil, Medio en Tablet, Grande en Desktop */}
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            {t.hero.greeting} <span className="text-gray-300">{t.hero.name}</span>
          </h1>

          {/* Animación de texto que simula escritura */}
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-400 h-[40px] md:h-[50px]">
            <span>{t.hero.iAmA}</span>
            <TypeAnimation
              sequence={t.hero.typeAnimation}
              wrapper="span"
              speed={50}
              className="text-neon-green border-b-4 border-neon-green"
              repeat={Infinity}
            />
          </div>

          <p className="text-gray-400 max-w-lg mx-auto md:mx-0 text-base sm:text-lg leading-relaxed">
             {t.hero.shortDescription}
          </p>

          {/* --- SECCIÓN 1: ACCIONES PRINCIPALES (Botones) --- */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start pt-4">
            {/* Botón para ir a la sección de contacto */}
            <a 
              href="#contacto"
              className="w-max px-6 py-3 border-2 border-neon-green text-neon-green font-mono hover:bg-neon-green hover:text-black transition-all duration-300 rounded shadow-neon font-bold text-sm sm:text-base flex items-center justify-center"
            >
              {t.hero.btnContact}
            </a>
            
            {/* Botón para descargar/ver el CV */}
            <a 
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-max px-6 py-3 border-2 border-gray-600 text-gray-300 font-mono hover:border-white hover:text-white transition-all duration-300 rounded flex items-center gap-2 text-sm sm:text-base"
            >
              <FaFileDownload /> {t.hero.btnResume}
            </a>
          </div>

          {/* --- SECCIÓN 2: REDES SOCIALES --- */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 font-mono mb-4 uppercase tracking-widest">
              {t.hero.socials}
            </p>

            {/* Enlaces a perfiles sociales con iconos */}
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

        {/* --- COLUMNA DERECHA: IMAGEN DE PERFIL --- */}
        <motion.div 
          // Animación de entrada con Framer Motion: aparece escalando desde el centro.
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center relative mt-8 md:mt-0"
        >
          {/* Aura decorativa detrás de la imagen con animación de pulso */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-neon-green rounded-full blur-[80px] opacity-20 animate-pulse"></div>
          
          {/* Contenedor de la imagen de perfil con borde y sombra */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full p-2 bg-gradient-to-br from-gray-800 to-black border-2 border-neon-green shadow-neon overflow-hidden">
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