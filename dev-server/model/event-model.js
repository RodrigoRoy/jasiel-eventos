import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String, // Nombre del evento
  layout: [{ // Lista de mesas
    position: {x: Number, y: Number},
    size: {width: Number, height: Number},
    chairs: [{
      x: Number,
      y: Number,
      size: Number,
      color: String,
      isFree: Boolean,
    }]
  }],
  place: {type: String, enum: ['Salón La Olla', 'Salón La Joya']}, // Nombre del lugar
  amount: {type: Number, default: 150, enum: [150, 200, 250, 300, 350, 400, 450, 500]},
  date: {type: Date, default: Date.now}, // Fecha del evento
  people: [{ // Lista de personas
    name: String,
    limit: Number,
    presence: Number
  }],
  guest: String, // Nombre de invitados
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});
eventSchema.set('timestamps', true);

export default mongoose.model('event', eventSchema);
