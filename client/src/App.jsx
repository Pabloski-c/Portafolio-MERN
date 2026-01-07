import './App.css';
// Componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SettingsMenu from './components/SettingsMenu';

/**
 * Componente principal de la aplicación.
 * 
 * Este componente actúa como el punto de entrada de la interfaz de usuario,
 * orquestando y renderizando todas las secciones principales de la página:
 * la barra de navegación, el contenido principal (hero, sobre mí, proyectos, contacto) y el pie de página.
 */
function App() {

  return (
    <div className="bg-dark-bg min-h-screen font-sans selection:bg-neon-green selection:text-black">
      {/* La barra de navegación es fija en la parte superior */}
      <Navbar />
      
      {/* El contenido principal de la página */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <SettingsMenu />
      
      {/* El pie de página al final de la página */}
      <Footer />
    </div>
  )
}

export default App
