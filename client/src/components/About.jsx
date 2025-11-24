/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';

const About = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // URL RAW de tu README principal
  const README_URL = 'https://raw.githubusercontent.com/Pabloski-c/Pabloski-c/main/README.md';

  useEffect(() => {
    fetch(README_URL)
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar el README:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="sobre-mi" className="py-20 bg-[#0a0a0a] text-whiteZS relative">
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
                // Títulos: Agregamos 'font-mono' para que parezca código/terminal
                h1: ({node, ...props}) => <h3 className="text-2xl font-bold font-mono text-white mt-8 mb-4 border-l-4 border-neon-green pl-4" {...props} />,
                h2: ({node, ...props}) => <h4 className="text-xl font-bold font-mono text-gray-200 mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h5 className="text-lg font-bold font-mono text-neon-green mt-4 mb-2" {...props} />,
                
                // Párrafos
                p: ({node, ...props}) => <p className="font-mono text-gray-400 leading-relaxed mb-4 text-sm md:text-base" {...props} />,

                // Listas
                ul: ({node, ...props}) => <ul className="font-mono list-disc list-inside text-gray-300 mb-4 space-y-1 text-sm md:text-base" {...props} />,
                li: ({node, ...props}) => <li className="marker:text-neon-green" {...props} />,
                // Enlaces
  
               a: ({node, ...props}) => <a className="text-neon-green hover:underline font-mono" target="_blank" rel="noopener noreferrer" {...props} />,

               // Imágenes
               img: ({node, ...props}) => (<img className="inline-block h-6 w-auto m-1 rounded-sm hover:scale-110 transition-transform select-none" {...props} />),
  
               // Bloques de código
              code: ({node, inline, className, children, ...props}) => (<code className={`${inline ? 'bg-gray-800 text-neon-green px-1 py-0.5 rounded' : 'block bg-[#111] p-4 rounded-lg border border-gray-700 overflow-x-auto'} font-mono text-sm`} {...props}>{children}</code>)
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