const express = require('express');
let app = express();
const bodyParser = require('body-parser');

//otros archivos de rutas
const routes = require('./routes/aforo.routes');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configuracion cabeceras y CORS
// Siempre que se haga una peticion se ejecutara esto primero
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','https://control-de-aaforo.000webhostapp.com/');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//rutas
app.use(routes);
//exportar el modulo
module.exports = app;