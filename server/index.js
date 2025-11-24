import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Message from './models/Message.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
// Usamos la variable de entorno o una local para pruebas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a la Base de Datos MongoDB'))
  .catch((err) => console.error('❌ Error de conexión a MongoDB:', err));

// Rutas
app.get('/', (req, res) => {
  res.send('Servidor MERN activo 🚀');
});

app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    console.log("Recibido:", nombre);

    // 1. Crear un nuevo mensaje con el modelo
    const newMessage = new Message({ nombre, email, mensaje });

    // 2. Guardarlo en la base de datos (Esto toma tiempo, por eso 'await')
    await newMessage.save();

    res.status(201).json({ message: "Mensaje guardado en la base de datos exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar el mensaje" });
  }
});

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}`);
});