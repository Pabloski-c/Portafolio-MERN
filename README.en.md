# Full Stack MERN Portfolio - Cyberpunk Edition

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> An interactive personal portfolio with a "Hacker/Terminal" aesthetic, developed from scratch using the full MERN stack. It features external API integration (GitHub) and a custom messaging system.

---

## Live Demo

**Frontend (Vercel):** [https://portafolio-mern.vercel.app](https://portafolio-mern.vercel.app)  
**Backend API (Render):** [https://portafolio-mern-api.onrender.com](https://portafolio-mern-api.onrender.com)

---

## Screenshot

![Portfolio Screenshot](./screenshot.png)

---

## Main Features

*   **Modern UI/UX Design:** Dark aesthetic with neon green accents, inspired by code terminals. Use of `framer-motion` for smooth animations and a fluid user experience.
*   **Bilingual Support (i18n):** Instant switching between Spanish and English across the entire interface and CV links via global context.
*   **Accessibility Panel (A11y):** Floating menu for real-time font size scaling and High Contrast mode toggle.
*   **Dynamic «About Me» Section:** Real-time fetching of GitHub profile Markdown content with rich formatting and **`localStorage` caching (1 hour)** to prevent rate limits and ensure maximum speed.
*   **Dynamic Integration with GitHub API:** Real-time repository showcase filtered automatically to feature the most relevant, non-fork projects.
*   **Animated Tech Stack Carousel:** Sticky sidebar icon tracks with continuous scrolling for a visually rich stack presentation.
*   **Interactive Hero Section:** High-impact hero with animated typewriter typography (`react-type-animation`), localized resume downloads, and interactive avatar.
*   **Optimized Navigation:** Glassmorphism navbar, responsive mobile menu, and an interactive scroll-spy indicator with sliding underline animations.
*   **Full Stack Contact System:** Functional form connected to a custom Node/Express backend persisting messages to MongoDB Atlas.

---

## Technologies Used

### Frontend (Client)
*   **React + Vite:** For a fast and modular build.
*   **CSS Modules & Vanilla CSS:** Decoupled, modular styling architecture with CSS variables and design tokens.
*   **Framer Motion:** For transitions, scroll-spy, and motion graphics.
*   **React Markdown & Rehype Raw:** For processing and styling Markdown from GitHub.
*   **React Type Animation:** For the typewriter effect in the hero header.
*   **React Icons:** Vector iconography.

### Backend (Server)
*   **Node.js & Express:** RESTful API to handle requests.
*   **MongoDB & Mongoose:** NoSQL database for message persistence.
*   **Cors & Dotenv:** Security management and environment variables.

---

## Local Installation and Deployment

To run this project on your local machine, follow these steps:

### Prerequisites
*   Make sure you have [Node.js](https://nodejs.org/) (version 14 or higher) installed.
*   npm or yarn.

### 1. Clone the Repository
```bash
git clone https://github.com/Pabloski-c/Portafolio-MERN
cd Portafolio-MERN
```

### 2. Configure the Backend
```bash
cd server
npm install
```
Create a `.env` file in the root of the `/server` folder and add your MongoDB connection string:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```
Finally, start the server:
```bash
# Starts the backend server for production (usually at http://localhost:5000)
npm start

# Or for development with automatic restart (nodemon):
npm run dev
```

### 3. Configure the Frontend
Open a new terminal.
```bash
cd client
npm install
```
Start the development client:
```bash
# Starts the React client with Vite (usually at http://localhost:5173)
npm run dev
```
And that's it! The application should be running in your local environment.

---

## Author

**[Pablo Torres Lell](https://github.com/Pabloski-c)**
*   Full Stack Developer in training.
*   Computer Engineering Student.

Made with ❤️ and a lot of code.
