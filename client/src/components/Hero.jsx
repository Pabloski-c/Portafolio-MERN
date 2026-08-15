import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import styles from './Hero.module.css';

// --- CONFIGURACIÓN ---
// Estas variables facilitan la actualización de datos clave sin tener que buscarlos en el código.
const GITHUB_USERNAME = "Pabloski-c"; // Tu nombre de usuario de GitHub para la foto de perfil.
const CV_URL_ES = "https://drive.google.com/file/d/1NVMiDpRfsfXkp0gpKMjTsymaWgT0Rb3o/view?usp=drive_link"; // Enlace directo a tu CV en español.
const CV_URL_EN = "https://drive.google.com/file/d/1o8q3cmGdSYNXmn6CxFO4K7jYgY1-GUNc/view?usp=drive_link"; // Enlace directo a tu CV en inglés.

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
    <section className={styles.hero}>
      {/* Fondo con efecto de grilla sutil y decorativo */}
      <div className={styles.gridBackground}></div>

      <div className={`container ${styles.heroContent}`}>
        
        {/* --- COLUMNA IZQUIERDA: TEXTO Y LLAMADAS A LA ACCIÓN --- */}
        <motion.div 
          // Animación de entrada con Framer Motion: aparece desde la izquierda.
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.leftCol}
        >
          <h2 
            className={styles.holaMundo}
            dangerouslySetInnerHTML={{ __html: t.hero.holaMundo }}
          />
          
          {/* Título adaptable: Pequeño en móvil, Medio en Tablet, Grande en Desktop */}
          <h1 className={styles.greetingTitle}>
            {t.hero.greeting} <span className={styles.greetingName}>{t.hero.name}</span>
          </h1>

          {/* Animación de texto que simula escritura */}
          <div className={styles.typewriterWrapper}>
            <span>{t.hero.iAmA}</span>
            <TypeAnimation
              key={language}
              sequence={[...t.hero.typeAnimation]}
              wrapper="span"
              speed={50}
              className={styles.typeAnimation}
              repeat={Infinity}
            />
          </div>

          <p className={styles.description}>
             {t.hero.shortDescription}
          </p>

          {/* --- SECCIÓN 1: ACCIONES PRINCIPALES (Botones) --- */}
          <div className={styles.actions}>
            {/* Botón para ir a la sección de contacto */}
            <a 
              href="#contacto"
              className={styles.btnContact}
            >
              {t.hero.btnContact}
            </a>
            
            {/* Botón para descargar/ver el CV */}
            <a 
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnResume}
            >
              <FaFileDownload /> {t.hero.btnResume}
            </a>
          </div>

          {/* --- SECCIÓN 2: REDES SOCIALES --- */}
          <div className={styles.socials}>
            <p className={styles.socialsLabel}>
              {t.hero.socials}
            </p>

            {/* Enlaces a perfiles sociales con iconos */}
            <div className={styles.socialsList}>
              <a 
                href="https://github.com/Pabloski-c" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/pablo-a-torres-lell/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn"
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
          className={styles.rightCol}
        >
          {/* Aura decorativa detrás de la imagen con animación de pulso */}
          <div className={styles.glowAura}></div>
          
          {/* Contenedor de la imagen de perfil con borde y sombra */}
          <div className={styles.avatarContainer}>
             <img 
               src={profileImage} 
               alt="Profile" 
               className={styles.avatarImg}
             />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;