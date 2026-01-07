import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

/**
 * Componente de Contacto.
 * 
 * Renderiza un formulario que permite a los usuarios enviar un mensaje.
 * Gestiona el estado del formulario, el envío de datos a un endpoint de la API
 * y muestra mensajes de feedback al usuario (enviando, éxito, error).
 */
const Contact = () => {
  const { t } = useSettings();
  // --- CONFIGURACIÓN ---
  const API_ENDPOINT = 'https://portafolio-mern-api.onrender.com/api/contact';

  // --- ESTADOS ---
  // Almacena los datos de los campos del formulario.
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  // Controla el estado del proceso de envío del formulario.
  const [status, setStatus] = useState(null); // Posibles valores: null, 'sending', 'success', 'error'

  /**
   * Actualiza el estado `formData` cada vez que el usuario escribe en un campo.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - El evento del cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Gestiona el envío del formulario al backend.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar.
    setStatus('sending'); // Cambia el estado para mostrar feedback de "enviando".

    try {
      // Petición POST al endpoint de la API con los datos del formulario.
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Si la petición fue exitosa...
      if (response.ok) {
        setStatus('success'); // Cambia el estado a "éxito".
        setFormData({ nombre: '', email: '', mensaje: '' }); // Limpia los campos del formulario.
        // Después de 3 segundos, resetea el mensaje de estado.
        setTimeout(() => setStatus(null), 3000); 
      } else {
        // Si el servidor responde con un error.
        setStatus('error');
      }
    } catch (error) {
      // Si hay un error de red o de conexión.
      console.error("Error de conexión:", error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 px-5 bg-dark-bg text-white relative overflow-hidden" id="contacto">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>

      <div className="container mx-auto max-w-4xl">
        {/* Título de la sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-neon-green inline-block border-b-4 border-neon-green pb-2"
            dangerouslySetInnerHTML={{ __html: t.contact.title }}
          />
          <p className="text-gray-400 mt-4">{t.contact.subtitle}</p>
        </motion.div>

        {/* Contenedor del formulario */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#111] p-8 rounded-lg border border-gray-800 shadow-[0_0_15px_rgba(0,255,65,0.05)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Campo Nombre */}
              <div className="space-y-2">
                <label className="text-neon-green font-mono text-sm">{t.contact.form.nameLabel}</label>
                <input 
                  type="text"
                  name="nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full bg-dark-bg border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                />
              </div>
              {/* Campo Email */}
              <div className="space-y-2">
                <label className="text-neon-green font-mono text-sm">{t.contact.form.emailLabel}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.form.emailPlaceholder}
                  className="w-full bg-dark-bg border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus-shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                />
              </div>
            </div>

            {/* Campo Mensaje */}
            <div className="space-y-2">
              <label className="text-neon-green font-mono text-sm">{t.contact.form.messageLabel}</label>
              <textarea 
                rows="5"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                placeholder={t.contact.form.messagePlaceholder}
                className="w-full bg-dark-bg border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all resize-none"
              ></textarea>
            </div>

            {/* Botón de envío */}
            <button 
              type="submit"
              // Deshabilita el botón mientras se está enviando el formulario.
              disabled={status === 'sending'}
              // Clases condicionales para estilizar el botón según el estado.
              className={`w-full py-4 border font-bold font-mono transition-all duration-300 rounded uppercase tracking-widest shadow-neon
                ${status === 'sending' ? 'bg-gray-700 border-gray-700 cursor-wait text-gray-400' : 'bg-transparent border-neon-green text-neon-green hover:bg-neon-green hover:text-black'}
              `}
            >
              {status === 'sending' ? t.contact.form.btnSending : t.contact.form.btnSend}
            </button>

            {/* Mensajes de feedback para el usuario */}
            {status === 'success' && (
              <p className="text-neon-green text-center font-mono animate-pulse">
                {t.contact.form.success}
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-center font-mono">
                {t.contact.form.error}
              </p>
            )}

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;