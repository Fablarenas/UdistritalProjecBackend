const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const esquemaUsuario = Schema({
    _id: String,
    nombre: String,
    contrasena: String
},{collection: 'usuario'});

module.exports = mongoose.model('usuario', esquemaUsuario);