/**
 * Objeto de configuración para personalizar la apariencia de cada proyecto.
 * 
 * La clave de cada objeto debe coincidir EXACTAMENTE con el nombre del repositorio en GitHub.
 * Esto permite asignar un tema de color, un subtítulo y una imagen específicos a cada proyecto.
 * 
 * @property {string} theme - El color de fondo que se mostrará cuando el proyecto esté en el centro de la pantalla.
 * @property {string} subtitle - Un subtítulo o eslogan para el proyecto.
 * @property {string} image - La URL de la imagen de vista previa del proyecto.
 * 
 * El objeto "default" se utiliza como fallback para cualquier repositorio que no tenga una configuración explícita.
 */
export const projectConfig = {
    "HermanosJota": {
      theme: "#bc5b35c7",
      subtitle: "Desarrollo Full Stack: e-commerce",
      image: "/projects/HermanosJota.jpg",
      accent: "#ffc464ff",
      color: "#f5f6ccff"
    },
    "Portafolio-MERN": {
      theme: "#0a192f",
      subtitle: "Diseño UI/UX & Desarrollo Full Stack",
      image: "/projects/portafolio.jpg",
      accent: "#64ffda",
      color: "#ccd6f6"
    },
    "Proyecto-GesGym": {
      theme: "#1a1a1a",
      subtitle: "Gestión Administrativa & C++",
      image: "https://placehold.co/600x400/transparent/0fff00/jpg?text=Sin-Imagen",
      accent: "#ff0055",
      color: "#e5e5e5"
    },
    // Configuración por defecto
    "default": {
      theme: "#0a0a0a",
      subtitle: "Desarrollo de Software",
      image: "/projects/default.jpg",
      accent: "#00ff41",
      color: "#e5e5e5"
    }
  };