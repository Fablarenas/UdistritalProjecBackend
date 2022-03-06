const express = require('express');
const route = express.Router();
const controller = require('../controllers/aforo.controller');
const validarjwt = require('../helpers/validate-jwt');



route.get('/obtenerAforo', controller.obtenerDatosAforo);
route.post('/actualizarAforo', validarjwt , controller.actualizarAforo);
route.get('/aumentarCuposDisponibles', controller.aumentarCuposDisponibles);
route.get('/disminuirCuposDisponibles', controller.disminuirCuposDisponibles);
route.post('/login', controller.login);
module.exports = route;