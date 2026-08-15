import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog, FaFont, FaAdjust } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';
import styles from './SettingsMenu.module.css';

/**
 * Componente del menú de configuración.
 * 
 * Este componente proporciona una interfaz de usuario flotante para ajustar las configuraciones de accesibilidad y preferencia.
 * Permite cambiar el tamaño de la fuente y activar el modo de alto contraste.
 * Utiliza el `useSettings` hook para interactuar con el `SettingsContext`.
 */
const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { increaseFont, toggleContrast, highContrast, t } = useSettings();

  return (
    <div className={styles.settingsContainer}>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className={styles.popupMenu}
          >
            {/* Tamaño Fuente */}
            <button 
              onClick={increaseFont}
              className={styles.menuItem}
            >
              <FaFont />
              <span className={styles.menuText}>
                {t.settingsMenu.fontSize}
              </span>
            </button>

            {/* Alto Contraste */}
            <button 
              onClick={toggleContrast}
              className={`${styles.menuItem} ${highContrast ? styles.menuItemActive : ''}`}
            >
              <FaAdjust />
              <span className={styles.menuText}>
                {t.settingsMenu.contrast}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Principal (Engranaje) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 90 }}
        className={styles.triggerBtn}
        aria-label={t.settingsMenu.ariaLabel}
      >
        <FaCog className={styles.triggerIcon} />
      </motion.button>
    </div>
  );
};

export default SettingsMenu;