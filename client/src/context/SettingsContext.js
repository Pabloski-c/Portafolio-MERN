import { createContext, useContext } from 'react';

// Crear el Contexto
export const SettingsContext = createContext();

// Crear y exportar el Hook personalizado
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings debe ser usado dentro de un SettingsProvider");
  }
  return context;
};