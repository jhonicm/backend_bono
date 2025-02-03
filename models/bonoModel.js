const mongoose = require('mongoose');

const bonoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    antiguedad: { type: Number, required: true },
    sueldo: { type: Number, required: true },
    bono: { type: Number, required: true }
});

module.exports = mongoose.model('Bono', bonoSchema);