import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { SettingsProvider } from './context/SettingsProvider';

/**
 * Punto de entrada de la aplicación React.
 * 
 * Este archivo se encarga de renderizar el componente principal `App` dentro del
 * elemento con el ID 'root' en el `index.html`.
 * 
 * `StrictMode` es un componente de React que ayuda a detectar problemas potenciales
 * en la aplicación durante el desarrollo. No afecta la compilación de producción.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
        <App />
    </SettingsProvider>
  </StrictMode>,
)
