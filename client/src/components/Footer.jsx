import React from 'react';
import { FaHeart, FaCode } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';
import styles from './Footer.module.css';

/**
 * Componente del pie de página.
 * 
 * Muestra información de copyright, el nombre del desarrollador y las tecnologías utilizadas.
 * El año se actualiza dinámicamente para reflejar el año actual.
 */
const Footer = () => {
  const { t } = useSettings();
  // Obtiene el año actual para mostrarlo en el pie de página.
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        {/* Información del desarrollador */}
        <p className={styles.footerItem}>
          <FaCode className={styles.codeIcon} />
          {t.footer.developedBy} <span className={styles.authorName}>{t.footer.name}</span>
        </p>

        {/* Copyright con año dinámico */}
        <p>{t.footer.copyright.replace('{year}', year)}</p>

        {/* Tecnologías utilizadas */}
        <p className={styles.footerItem}>
          {t.footer.madeWith} <FaHeart className={styles.heartIcon} /> {t.footer.tool}
        </p>
      </div>
    </footer>
  );
};

export default Footer;