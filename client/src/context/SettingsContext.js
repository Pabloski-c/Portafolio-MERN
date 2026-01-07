import { createContext, useContext } from 'react';

/**
 * @typedef {object} SettingsContextType
 * @property {string} language - El idioma actual de la aplicación ('es' o 'en').
 * @property {function} toggleLanguage - Función para cambiar el idioma.
 * @property {function} increaseFont - Función para aumentar el tamaño de la fuente base.
 * @property {boolean} highContrast - Booleano que indica si el modo de alto contraste está activado.
 * @property {function} toggleContrast - Función para activar/desactivar el modo de alto contraste.
 * @property {object} t - El objeto de traducciones para el idioma actual.
 */

/**
 * Contexto de configuración para la aplicación.
 * Proporciona acceso a las configuraciones de idioma, fuente y contraste.
 * @type {React.Context<SettingsContextType>}
 */
export const SettingsContext = createContext();

/**
 * Hook personalizado para acceder al contexto de configuración.
 * 
 * @returns {SettingsContextType} El valor del contexto de configuración.
 * @throws {Error} Si el hook se usa fuera de un `SettingsProvider`.
 */
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings debe ser usado dentro de un SettingsProvider");
  }
  return context;
};