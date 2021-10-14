const schemaBD = require('../models/user.model');

const ID_AFORO = {_id : 2021};
const controller = {
    obtenerDatosAforo: function(req, res) {
        schemaBD.findById(ID_AFORO,(error, datosObtenidos)=>{
            if(error) {
                return res.status(500).send({mensaje:'Error al obtener los datos: ' + error});
            }else if(!datosObtenidos) {
                return res.status(404).send({mensaje:'No se pudo obtener los datos'});
            }
            return res.status(200).send(datosObtenidos);
        });
    },
    actualizarAforo: function(req, res) {
        let datoDeAforo = new schemaBD();
        datoDeAforo.aforo = req.body.aforo; 
        schemaBD.findOneAndUpdate(ID_AFORO, datoDeAforo, {new:true},(error, datoActualizado)=>{
            if(error) {
                return res.status(500).send({mensaje:'Error al actualizar el aforo: ' + error});
            }else if(!datoActualizado) {
                return res.status(404).send({mensaje:'No se pudo actualizar el aforo'});
            }
            return res.status(200).send(datoActualizado);
        });
    },
    aumentarCuposDisponibles: function(req, res) {
        let cuposDisponibles = { $inc: { "cuposDisponibles" : 1 } };
        schemaBD.findOneAndUpdate(ID_AFORO, cuposDisponibles, {new:true},(error, cuposDisponiblesActualizado)=>{
            if(error) {
                return res.status(500).send({mensaje:'Error al aumentar los cupos disponibles: ' + error});
            }else if(!cuposDisponiblesActualizado) {
                return res.status(404).send({mensaje:'No se pudo aumentar los cupos disponibles'});
            }
            return res.status(200).send(cuposDisponiblesActualizado);
        });
    },
    disminuirCuposDisponibles: function(req, res) {
        const cuposDisponibles = { $inc: { "cuposDisponibles" : -1 } };
        schemaBD.findOneAndUpdate(ID_AFORO, cuposDisponibles, {new:true},(error, cuposDisponiblesActualizado)=>{
            if(error) {
                return res.status(500).send({mensaje:'Error al disminuir los cupos disponibles: ' + error});
            }else if(!cuposDisponiblesActualizado) {
                return res.status(404).send({mensaje:'No se pudo disminuir los cupos disponibles, el _id:'+ID_AFORO+' no existe'});
            }
            return res.status(200).send(cuposDisponiblesActualizado);
        });
    },
}

module.exports = controller;