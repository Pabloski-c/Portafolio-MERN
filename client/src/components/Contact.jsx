import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  // 1. Estados para guardar los datos y el estado del envío
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  // 2. Función para actualizar los datos al escribir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Función para enviar los datos al Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setStatus('sending');

    try {
      const response = await fetch('https://portafolio-mern-api.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', mensaje: '' }); // Limpiar formulario
        setTimeout(() => setStatus(null), 3000); // Borrar mensaje de éxito después de 3s
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 px-5 bg-dark-bg text-white relative overflow-hidden" id="contacto">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>

      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-neon-green inline-block border-b-4 border-neon-green pb-2">
            &lt;Contacto /&gt;
          </h2>
          <p className="text-gray-400 mt-4">¿Tienes una idea o proyecto? Iniciemos conexión.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#111] p-8 rounded-lg border border-gray-800 shadow-[0_0_15px_rgba(0,255,65,0.05)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-neon-green font-mono text-sm">Usuario (Nombre)</label>
                <input 
                  type="text"
                  name="nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="John Doe" 
                  className="w-full bg-dark-bg border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-neon-green font-mono text-sm">Email de destino</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com" 
                  className="w-full bg-dark-bg border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-neon-green font-mono text-sm">Mensaje encriptado</label>
              <textarea 
                rows="5"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                placeholder="Escribe tu mensaje aquí..." 
                className="w-full bg-dark-bg border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-4 border font-bold font-mono transition-all duration-300 rounded uppercase tracking-widest shadow-neon
                ${status === 'sending' ? 'bg-gray-700 border-gray-700 cursor-wait text-gray-400' : 'bg-transparent border-neon-green text-neon-green hover:bg-neon-green hover:text-black'}
              `}
            >
              {status === 'sending' ? 'ENVIANDO DATOS...' : 'ENVIAR TRANSMISIÓN'}
            </button>

            {/* Mensajes de feedback */}
            {status === 'success' && (
              <p className="text-neon-green text-center font-mono animate-pulse">
                ✅ ¡Mensaje recibido en el servidor central!
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-center font-mono">
                ❌ Error de conexión. El servidor no responde.
              </p>
            )}

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;