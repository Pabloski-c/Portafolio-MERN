import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog, FaFont, FaAdjust } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-[#111] border border-gray-800 p-4 rounded-xl shadow-2xl flex flex-col gap-3 mb-2 min-w-[160px]"
          >
            {/* Tamaño Fuente */}
            <button 
              onClick={increaseFont}
              className="flex items-center gap-3 text-gray-300 hover:text-neon-green transition-colors w-full p-2 rounded-lg hover:bg-white/5"
            >
              <FaFont />
              <span className="font-mono text-sm">
                {t.settingsMenu.fontSize}
              </span>
            </button>

            {/* Alto Contraste */}
            <button 
              onClick={toggleContrast}
              className={`flex items-center gap-3 transition-colors w-full p-2 rounded-lg hover:bg-white/5 ${highContrast ? 'text-neon-green' : 'text-gray-300'}`}
            >
              <FaAdjust />
              <span className="font-mono text-sm">
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
        className="bg-neon-green text-black p-4 rounded-full shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)] transition-all"
        aria-label={t.settingsMenu.ariaLabel}
      >
        <FaCog className="text-xl" />
      </motion.button>
    </div>
  );
};

export default SettingsMenu;