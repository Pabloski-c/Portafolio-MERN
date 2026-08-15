import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiVite } from 'react-icons/si';
import styles from './SideTechStack.module.css';

// Array de tecnologías a mostrar en la barra lateral.
const technologies = [
  { icon: <FaReact /> },
  { icon: <FaNodeJs /> },
  { icon: <SiExpress /> },
  { icon: <SiMongodb /> },
  { icon: <FaJs /> },
  { icon: <SiTailwindcss /> },
  { icon: <SiVite /> },
  { icon: <FaHtml5 /> },
  { icon: <FaCss3Alt /> },
  { icon: <FaGitAlt /> },
];

/**
 * Componente SideTechStack.
 * 
 * Renderiza una barra lateral decorativa con una columna de iconos de tecnologías 
 * que se desplazan infinitamente en un bucle.
 * 
 * @param {object} props - Propiedades del componente.
 * @param {'normal' | 'reverse'} [props.direction="normal"] - La dirección de la animación del scroll.
 */
const SideTechStack = ({ direction = "normal" }) => {
  return (
    <div className={styles.sideContainer}>
      <div className={styles.maskWrapper}>
        <motion.div
          className={styles.iconColumn}
          initial={{ y: direction === "normal" ? "0%" : "-40%" }}
          animate={{ y: direction === "normal" ? "-40%" : "0%" }}
          transition={{ 
            ease: "linear", 
            duration: 35,
            repeat: Infinity, 
            repeatType: "mirror"
          }}
        >
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className={styles.techIcon}
            >
              {tech.icon}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SideTechStack;