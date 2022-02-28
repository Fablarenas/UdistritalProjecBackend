const express = require('express');
const route = express.Router();
const controller = require('../controllers/aforo.controller')


route.get('/obtenerAforo', controller.obtenerDatosAforo);
route.post('/actualizarAforo', controller.actualizarAforo);
route.get('/aumentarCuposDisponibles', controller.aumentarCuposDisponibles);
route.get('/disminuirCuposDisponibles', controller.disminuirCuposDisponibles);
route.get('/ipcliente', (req,res) => res.status(200).send(req.ip));
module.exports = route;