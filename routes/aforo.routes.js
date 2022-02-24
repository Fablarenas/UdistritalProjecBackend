const express = require('express');
const route = express.Router();
const cors = require('cors');
const controller = require('../controllers/aforo.controller')

var whitelist = ['https://control-de-aaforo.000webhostapp.com/','201.221.173.46']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

route.get('/obtenerAforo', controller.obtenerDatosAforo);
route.post('/actualizarAforo',cors(corsOptions), controller.actualizarAforo);
route.get('/aumentarCuposDisponibles',cors(corsOptions), controller.aumentarCuposDisponibles);
route.get('/disminuirCuposDisponibles',cors(corsOptions), controller.disminuirCuposDisponibles);

module.exports = route;