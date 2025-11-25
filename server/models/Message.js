import mongoose from 'mongoose';

/**
 * Esquema de Mongoose para los mensajes de contacto.
 * 
 * Define la estructura que tendrán los documentos en la colección 'messages' de MongoDB.
 * Cada mensaje almacenará el nombre, email y mensaje del remitente, junto con la fecha de creación.
 */
const messageSchema = new mongoose.Schema({
  // El nombre del remitente es obligatorio.
  nombre: { 
    type: String, 
    required: [true, 'El nombre es un campo obligatorio.'] 
  },
  // El email del remitente es obligatorio.
  email: { 
    type: String, 
    required: [true, 'El email es un campo obligatorio.'] 
  },
  // El contenido del mensaje es obligatorio.
  mensaje: { 
    type: String, 
    required: [true, 'El mensaje no puede estar vacío.'] 
  },
  // La fecha de recepción del mensaje. Se establece automáticamente al crear el documento.
  fecha: { 
    type: Date, 
    default: Date.now 
  }
});

/**
 * Modelo de Mongoose para los mensajes.
 * 
 * Un modelo es una clase con la que construimos documentos. En este caso, cada documento
 * será un mensaje con las propiedades y comportamientos declarados en nuestro `messageSchema`.
 * Mongoose buscará automáticamente la versión en plural y minúsculas del nombre del modelo,
 * es decir, la colección 'messages'.
 */
const Message = mongoose.model('Message', messageSchema);

export default Message;