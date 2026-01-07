import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

/**
 * Componente "Sobre Mí".
 * 
 * Este componente obtiene dinámicamente el contenido del archivo README.md del perfil de GitHub del usuario,
 * lo almacena en caché en el localStorage para mejorar el rendimiento y reducir las peticiones a la API,
 * y lo renderiza como HTML. También maneja los estados de carga y error.
 */
const About = () => {
  const { t } = useSettings();
  // --- ESTADOS ---
  const [content, setContent] = useState(''); // Almacena el contenido del README en formato Markdown.
  const [loading, setLoading] = useState(true); // Indica si el contenido se está cargando.
  const [error, setError] = useState(false); // Indica si ha ocurrido un error durante la obtención de datos.

  // --- CONFIGURACIÓN ---
  const README_URL = 'https://raw.githubusercontent.com/Pabloski-c/Pabloski-c/main/README.md';
  const CACHE_KEY = 'readme_cache'; // Clave para el almacenamiento en localStorage.
  const CACHE_DURATION = 3600000; // 1 hora en milisegundos.

  useEffect(() => {
    /**
     * Obtiene el contenido del README.md, priorizando la caché local.
     */
    const fetchReadme = async () => {
      const now = new Date().getTime();
      const cachedData = localStorage.getItem(CACHE_KEY);

      // 1. INTENTAR CARGAR DESDE CACHÉ
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // Comprueba si la caché no ha expirado.
        if (now - timestamp < CACHE_DURATION) {
          console.log("Cargando README desde caché local...");
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
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente.

  return (
    <section id="sobre-mi" className="py-20 bg-[#0a0a0a] text-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Título de la sección con animación */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-neon-green inline-block border-b-4 border-neon-green pb-2"
            dangerouslySetInnerHTML={{ __html: t.about.title }}
          />
        </motion.div>

        {/* Renderizado condicional basado en el estado */}
        {loading ? (
          <div className="font-mono text-neon-green animate-pulse">{t.about.loading}</div>
        ) : error ? (
          <div className="text-red-500 font-mono border border-red-500 p-4 rounded bg-red-500/10">
            {t.about.error}
          </div>
        ) : (
          // Contenedor para el contenido renderizado desde Markdown.
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <ReactMarkdown
              // rehypeRaw permite interpretar HTML dentro del Markdown (¡usar con precaución y solo con fuentes de confianza!).
              rehypePlugins={[rehypeRaw]} 
              // `components` permite sobreescribir y estilizar elementos HTML específicos.
              components={{
                h1: ({...props}) => <h3 className="text-2xl font-bold font-mono text-white mt-8 mb-4 border-l-4 border-neon-green pl-4" {...props} />,
                h2: ({...props}) => <h4 className="text-xl font-bold font-mono text-gray-200 mt-6 mb-3" {...props} />,
                h3: ({...props}) => <h5 className="text-lg font-bold font-mono text-neon-green mt-4 mb-2" {...props} />,
                
                p: ({...props}) => <p className="font-mono text-gray-400 leading-relaxed mb-4 text-sm md:text-base" {...props} />,
                
                ul: ({...props}) => <ul className="font-mono list-disc list-inside text-gray-300 mb-4 space-y-1 text-sm md:text-base" {...props} />,
                li: ({...props}) => <li className="marker:text-neon-green" {...props} />,
                
                a: ({...props}) => <a className="text-neon-green hover:underline font-mono" target="_blank" rel="noopener noreferrer" {...props} />,
                
                // Estiliza las imágenes para que se muestren pequeñas y en línea (ideal para iconos de tecnologías).
                img: ({...props}) => (
                  <img 
                    className="inline-block h-6 w-auto m-1 rounded-sm hover:scale-110 transition-transform select-none" 
                    {...props} 
                  />
                ),
                
                // Estiliza los bloques de código y el código en línea de manera diferente.
                code: ({inline, children, ...props}) => (
                  <code className={`${inline ? 'bg-gray-800 text-neon-green px-1 py-0.5 rounded' : 'block bg-[#111] p-4 rounded-lg border border-gray-700 overflow-x-auto'} font-mono text-sm`} {...props}>
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