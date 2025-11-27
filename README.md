# Portafolio Full Stack MERN - Edición Cyberpunk

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> Un portafolio personal interactivo con estética "Hacker/Terminal", desarrollado desde cero utilizando el stack MERN completo. Cuenta con integración de API externa (GitHub) y un sistema de mensajería propio.

---

## Demo en Vivo

**Frontend (Vercel):** [https://portafolio-mern.vercel.app](https://portafolio-mern.vercel.app)  
**Backend API (Render):** [https://portafolio-mern-api.onrender.com](https://portafolio-mern-api.onrender.com)

---

## Captura de Pantalla

![Vista Previa del Portafolio](./screenshot.png)

---

## Características Principales

* **Diseño UI/UX Moderno:** Estética oscura con acentos verde neón, inspirada en terminales de código. Uso de `framer-motion` para animaciones suaves y una experiencia de usuario fluida.
* **Integración Dinámica con GitHub API:** La sección de proyectos se alimenta en tiempo real desde la API de GitHub, mostrando mis repositorios más recientes. Se filtran automáticamente para excluir forks y mostrar solo proyectos con descripción, asegurando que el contenido sea siempre relevante.
* **Carrusel de Tecnologías Animado:** Una barra de iconos con desplazamiento infinito (efecto "ping-pong") que muestra mi stack tecnológico de una manera visualmente atractiva, construida con `framer-motion`.
* **Hero Section Mejorado:** Diseño de alto impacto con tipografía y espaciado cuidadosamente ajustados para una perfecta visualización en cualquier dispositivo, desde móviles hasta pantallas grandes.
* **Navegación Optimizada:** Barra de navegación con efecto "glassmorphism" y un menú móvil rediseñado para una mejor experiencia de usuario en pantallas táctiles.
* **Sistema de Contacto Full Stack:** Formulario funcional conectado a un Backend propio (Node/Express) que almacena los mensajes en una base de datos MongoDB en la nube.

---

## Tecnologías Usadas

### Frontend (Cliente)
* **React + Vite:** Para una construcción rápida y modular.
* **Tailwind CSS:** Para el estilizado avanzado y diseño responsivo.
* **Framer Motion:** Para las transiciones y efectos de entrada.
* **React Icons:** Iconografía vectorial.

### Backend (Servidor)
* **Node.js & Express:** API RESTful para manejar las peticiones.
* **MongoDB & Mongoose:** Base de datos NoSQL para persistencia de mensajes.
* **Cors & Dotenv:** Gestión de seguridad y variables de entorno.

---

## Instalación y Despliegue Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

### Prerrequisitos
* Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 14 o superior).
* npm o yarn.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Pabloski-c/Portafolio-MERN.git
cd Portafolio-MERN
```

### 2. Configurar el Backend
```bash
cd server
npm install
```
Crea un archivo `.env` en la raíz de la carpeta `/server` y añade tu clave de conexión de MongoDB:
```
MONGO_URI=tu_string_de_conexion_a_mongodb_atlas
PORT=5000
```
Finalmente, inicia el servidor de desarrollo:
```bash
# Inicia el servidor backend (normalmente en http://localhost:5000)
npm run dev
```

### 3. Configurar el Frontend
Abre una nueva terminal.
```bash
cd client
npm install
```
Inicia el cliente de desarrollo:
```bash
# Inicia el cliente de React (normalmente en http://localhost:5173)
npm run dev
```
¡Y listo! La aplicación debería estar corriendo en tu entorno local.

---

## Autor

**Pablo Torres Lell**
* Full Stack Developer en formación.
* Estudiante de Ingeniería Informática.

Hecho con ❤️ y mucho código.