import './App.css';
// Componentes
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {

  return (
    <div className="bg-dark-bg min-h-screen font-sans selection:bg-neon-green selection:text-black">
      {/* Navbar simplificado (opcional por ahora, o usamos el Hero como intro) */}
      
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
