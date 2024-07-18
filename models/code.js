const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Code', codeSchema);
