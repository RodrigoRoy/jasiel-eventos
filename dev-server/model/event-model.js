import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String, // Nombre del evento
  layout: [{ // Lista de mesas
    label: String,
    position: {x: Number, y: Number},
    size: {width: Number, height: Number},
    chairs: [{
      label: String,
      x: Number,
      y: Number,
      size: Number,
      color: String,
      isFree: Boolean,
    }]
  }],
  place: {type: String, enum: ['Salón La Olla', 'Salón La Joya']}, // Nombre del lugar
  amount: {type: Number, default: 100, enum: [100, 150, 200, 250, 300, 350, 400, 450, 500]},
  date: {type: Date, default: Date.now}, // Fecha del evento
  people: [{ // Lista de personas invitadas
    name: String,
    limit: Number,
    presence: Number,
    chairs: [String] // Lista de sillas seleccionadas
  }],
  guest: String, // Nombre de anfitrión
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});
eventSchema.set('timestamps', true);

export default mongoose.model('event', eventSchema);
