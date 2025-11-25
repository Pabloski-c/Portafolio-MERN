import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Message from './models/Message.js';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
// Habilita CORS (Cross-Origin Resource Sharing) para permitir peticiones desde el frontend.
app.use(cors());
// Parsea las peticiones entrantes con payloads en formato JSON.
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
const MONGO_URI = process.env.MONGO_URI;

// Conecta a la base de datos de MongoDB usando la URI del archivo .env.
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a la Base de Datos MongoDB'))
  .catch((err) => console.error('❌ Error de conexión a MongoDB:', err));

// --- RUTAS ---

/**
 * @route   GET /
 * @desc    Ruta de prueba para verificar que el servidor está activo.
 * @access  Public
 */
app.get('/', (req, res) => {
  res.send('Servidor MERN activo 🚀');
});

/**
 * @route   POST /api/contact
 * @desc    Recibe y guarda un nuevo mensaje de contacto en la base de datos.
 * @access  Public
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    console.log("Recibiendo datos del formulario de contacto:", { nombre, email });

    // 1. Crea una nueva instancia del modelo `Message` con los datos recibidos.
    const newMessage = new Message({ nombre, email, mensaje });

    // 2. Guarda el nuevo mensaje en la colección de la base de datos.
    await newMessage.save();

    // 3. Responde al cliente con un estado 201 (Creado) y un mensaje de éxito.
    res.status(201).json({ message: "Mensaje guardado en la base de datos exitosamente" });
  } catch (error) {
    console.error("Error al procesar la petición de contacto:", error);
    // En caso de error, responde con un estado 500 (Error Interno del Servidor).
    res.status(500).json({ message: "Error al guardar el mensaje" });
  }
});

// --- INICIO DEL SERVIDOR ---
// Pone el servidor a la escucha en el puerto especificado.
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}`);
});