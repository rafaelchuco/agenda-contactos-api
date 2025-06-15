const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\+?[\d\s\-\(\)]{8,15}$/.test(v);
      },
      message: 'Formato de teléfono inválido'
    }
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || validator.isEmail(v);
      },
      message: 'Formato de email inválido'
    }
  },
  direccion: {
    type: String,
    trim: true,
    maxlength: [200, 'La dirección no puede exceder 200 caracteres']
  },
  fechaNacimiento: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v <= new Date();
      },
      message: 'La fecha de nacimiento no puede ser futura'
    }
  }
}, {
  timestamps: true
});


contactSchema.index({ nombre: 'text', email: 'text' });

module.exports = mongoose.model('Contact', contactSchema);