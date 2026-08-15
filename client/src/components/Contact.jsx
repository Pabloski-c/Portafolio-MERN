import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import styles from './Contact.module.css';

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
    <section className={styles.contactSection} id="contacto">
      {/* Línea decorativa superior */}
      <div className={styles.topAccentLine}></div>

      <div className={`container ${styles.contactContainer}`}>
        {/* Título de la sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: t.contact.title }}
          />
          <p className={styles.subtitle}>{t.contact.subtitle}</p>
        </motion.div>

        {/* Contenedor del formulario */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.formCard}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGrid}>
              {/* Campo Nombre */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.contact.form.nameLabel}</label>
                <input 
                  type="text"
                  name="nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.form.namePlaceholder}
                  className={styles.input}
                />
              </div>
              {/* Campo Email */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.contact.form.emailLabel}</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.form.emailPlaceholder}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Campo Mensaje */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>{t.contact.form.messageLabel}</label>
              <textarea 
                rows="5"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                placeholder={t.contact.form.messagePlaceholder}
                className={styles.textarea}
              ></textarea>
            </div>

            {/* Botón de envío */}
            <button 
              type="submit"
              disabled={status === 'sending'}
              className={`${styles.submitBtn} ${status === 'sending' ? styles.submitBtnSending : ''}`}
            >
              {status === 'sending' ? t.contact.form.btnSending : t.contact.form.btnSend}
            </button>

            {/* Mensajes de feedback para el usuario */}
            {status === 'success' && (
              <p className={styles.feedbackSuccess}>
                {t.contact.form.success}
              </p>
            )}
            {status === 'error' && (
              <p className={styles.feedbackError}>
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