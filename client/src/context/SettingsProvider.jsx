import React, { useState, useEffect } from 'react';
import { translations } from '../constants/translations';
import { SettingsContext } from './SettingsContext'; // <--- Importamos el contexto del otro archivo

/**

 * Proveedor de contexto para las configuraciones de la aplicación.

 * 

 * Este componente envuelve la aplicación y proporciona los valores de configuración

 * (idioma, tamaño de fuente, contraste) y las funciones para modificarlos

 * a todos los componentes hijos que usen el hook `useSettings`.

 * 

 * @param {object} props - Propiedades del componente.

 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.

 */

export const SettingsProvider = ({ children }) => {

  // --- ESTADOS ---

  const [language, setLanguage] = useState('es'); 

  const [fontSize, setFontSize] = useState(1); 

  const [highContrast, setHighContrast] = useState(false);



  // --- FUNCIONES ---

  const toggleLanguage = () => {

    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));

  };

  const increaseFont = () => setFontSize(prev => (prev < 1.2 ? prev + 0.1 : 1));
  const toggleContrast = () => setHighContrast(prev => !prev);

  // Obtener el objeto de textos según el idioma actual
  const t = translations[language];

  // --- EFECTOS VISUALES ---
  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * fontSize}px`;
    
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  return (
    <SettingsContext.Provider value={{ 
      language, 
      t, 
      toggleLanguage, 
      fontSize, 
      increaseFont,
      highContrast,
      toggleContrast 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};