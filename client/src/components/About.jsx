import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import styles from './About.module.css';

/**
 * Componente "Sobre Mí".
 * 
 * Este componente obtiene dinámicamente el contenido del archivo README.md del perfil de GitHub del usuario,
 * lo almacena en caché en el localStorage para mejorar el rendimiento y reducir las peticiones a la API,
 * y lo renderiza como HTML. También maneja los estados de carga y error.
 */
const About = () => {
  const { t, language } = useSettings();
  // --- ESTADOS ---
  const [content, setContent] = useState(''); // Almacena el contenido del README en formato Markdown.
  const [loading, setLoading] = useState(true); // Indica si el contenido se está cargando.
  const [error, setError] = useState(false); // Indica si ha ocurrido un error durante la obtención de datos.

  useEffect(() => {
    // --- CONFIGURACIÓN ---
    const README_URL_ES = 'https://raw.githubusercontent.com/Pabloski-c/Pabloski-c/main/README.md';
    const README_URL_EN = 'https://raw.githubusercontent.com/Pabloski-c/Pabloski-c/main/README.en.md';
    const README_URL = language === 'en' ? README_URL_EN : README_URL_ES;
    
    const CACHE_KEY = `readme_cache_${language}`; // Clave para el almacenamiento en localStorage.
    const CACHE_DURATION = 3600000; // 1 hora en milisegundos.

    /**
     * Obtiene el contenido del README.md, priorizando la caché local.
     */
    const fetchReadme = async () => {
      setLoading(true); // Inicia la carga al cambiar de idioma
      const now = new Date().getTime();
      const cachedData = localStorage.getItem(CACHE_KEY);

      // 1. INTENTAR CARGAR DESDE CACHÉ
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // Comprueba si la caché no ha expirado.
        if (now - timestamp < CACHE_DURATION) {
          console.log(`Cargando README (${language}) desde caché local...`);
          setContent(data);
          setLoading(false);
          return;
        }
      }

      // 2. SI NO HAY CACHÉ VÁLIDO, OBTENER DE GITHUB
      try {
        const res = await fetch(README_URL);
        
        // Manejo de errores de la API (ej. límite de peticiones).
        if (!res.ok) {
          // Si la API de GitHub nos limita (status 429).
          if (res.status === 429) {
            console.warn("Límite de peticiones excedido. Usando caché antigua si existe.");
            // Como fallback, intenta usar la caché vieja aunque esté caducada.
            if (cachedData) {
              const { data } = JSON.parse(cachedData);
              setContent(data);
              setLoading(false);
              return;
            }
          }
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const text = await res.text();
        
        // 3. GUARDAR EN CACHÉ EL NUEVO CONTENIDO
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: text,
          timestamp: now
        }));

        setContent(text);
        setLoading(false);

      } catch (err) {
        console.error("Error al obtener el README:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchReadme();
  }, [language]); // El efecto se ejecuta cuando cambia el idioma.

  return (
    <section id="sobre-mi" className={styles.about}>
      <div className={`container ${styles.aboutContainer}`}>
        
        {/* Título de la sección con animación */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: t.about.title }}
          />
        </motion.div>

        {/* Renderizado condicional basado en el estado */}
        {loading ? (
          <div className={styles.loading}>{t.about.loading}</div>
        ) : error ? (
          <div className={styles.error}>
            {t.about.error}
          </div>
        ) : (
          // Contenedor para el contenido renderizado desde Markdown.
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.prose}
          >
            <ReactMarkdown
              // rehypeRaw permite interpretar HTML dentro del Markdown.
              rehypePlugins={[rehypeRaw]} 
              // `components` permite sobreescribir y estilizar elementos HTML específicos.
              components={{
                h1: ({...props}) => <h3 className={styles.heading1} {...props} />,
                h2: ({...props}) => <h4 className={styles.heading2} {...props} />,
                h3: ({...props}) => <h5 className={styles.heading3} {...props} />,
                
                p: ({...props}) => <p className={styles.paragraph} {...props} />,
                
                ul: ({...props}) => <ul className={styles.list} {...props} />,
                li: ({...props}) => <li className={styles.listItem} {...props} />,
                
                a: ({...props}) => <a className={styles.link} target="_blank" rel="noopener noreferrer" {...props} />,
                
                // Estiliza las imágenes para que se muestren pequeñas y en línea (ideal para iconos de tecnologías).
                img: ({...props}) => (
                  <img 
                    className={styles.badgeImg} 
                    {...props} 
                  />
                ),
                
                // Estiliza los bloques de código y el código en línea de manera diferente.
                code: ({inline, children, ...props}) => (
                  <code className={inline ? styles.codeInline : styles.codeBlock} {...props}>
                    {children}
                  </code>
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;