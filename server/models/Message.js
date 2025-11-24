import mongoose from 'mongoose';

// Definimos la estructura de la información
const messageSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now } // Se pone la hora sola automáticamente
});

// Creamos el modelo "Message"
export default mongoose.model('Message', messageSchema);