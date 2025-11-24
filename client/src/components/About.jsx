/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';

const About = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // URL RAW de tu README principal
  const README_URL = 'https://raw.githubusercontent.com/Pabloski-c/Pabloski-c/main/README.md';
  const CACHE_KEY = 'readme_cache';
  const CACHE_DURATION = 3600000; // 1 hora en milisegundos

  useEffect(() => {
    const fetchReadme = async () => {
      const now = new Date().getTime();
      const cachedData = localStorage.getItem(CACHE_KEY);

      // Intentar cargar desde caché si existe y es válido
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < CACHE_DURATION) {
          console.log("Cargando README desde caché local...");
          setContent(data);
          setLoading(false);
          return;
        }
      }

      // Si no hay caché válido, pedir a GitHub
      try {
        const res = await fetch(README_URL);
        
        if (!res.ok) {
          if (res.status === 429) {
            console.warn("Límite de peticiones excedido. Usando caché antigua si existe.");
            // Si nos bloquean, intentamos usar la caché vieja aunque esté caducada
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
        
        // Guardar en caché nuevo contenido
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
  }, []);

  return (
    <section id="sobre-mi" className="py-20 bg-[#0a0a0a] text-white relative">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-neon-green inline-block border-b-4 border-neon-green pb-2">
            &lt;Sobre Mí /&gt;
          </h2>
        </motion.div>

        {loading ? (
          <div className="font-mono text-neon-green animate-pulse">Decodificando datos del usuario...</div>
        ) : error ? (
          <div className="text-red-500 font-mono border border-red-500 p-4 rounded bg-red-500/10">
            ⚠️ No se pudo cargar la información de GitHub en este momento. (Posible límite de tasa excedido, intenta más tarde).
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]} 
              components={{
                h1: ({node, ...props}) => <h3 className="text-2xl font-bold font-mono text-white mt-8 mb-4 border-l-4 border-neon-green pl-4" {...props} />,
                h2: ({node, ...props}) => <h4 className="text-xl font-bold font-mono text-gray-200 mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h5 className="text-lg font-bold font-mono text-neon-green mt-4 mb-2" {...props} />,
                
                p: ({node, ...props}) => <p className="font-mono text-gray-400 leading-relaxed mb-4 text-sm md:text-base" {...props} />,
                
                ul: ({node, ...props}) => <ul className="font-mono list-disc list-inside text-gray-300 mb-4 space-y-1 text-sm md:text-base" {...props} />,
                li: ({node, ...props}) => <li className="marker:text-neon-green" {...props} />,
                
                a: ({node, ...props}) => <a className="text-neon-green hover:underline font-mono" target="_blank" rel="noopener noreferrer" {...props} />,
                
                img: ({node, ...props}) => (
                  <img 
                    className="inline-block h-6 w-auto m-1 rounded-sm hover:scale-110 transition-transform select-none" 
                    {...props} 
                  />
                ),
                
                code: ({node, inline, className, children, ...props}) => (
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