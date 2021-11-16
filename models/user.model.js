const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const esquemaAforo = Schema({
    _id: Number,
    cuposDisponibles: Number,
    ocupacionActual: Number,
    aforo: Number
},{collection: 'aforodata'});

module.exports = mongoose.model('aforodata', esquemaAforo);