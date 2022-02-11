const schemaBD = require('../models/aforo.model');

const ID_AFORO = {_id : 2021};

const getAforo = (id) => {

    return new Promise((resolve, reject) => {

        schemaBD.findById(ID_AFORO, (error, datosObtenidos) => {
            if (error) {
                reject(error);
            } else if (!datosObtenidos) {
                resolve(datosObtenidos);
            }
            return resolve(datosObtenidos);
        });
    });
}

const controller = {

    obtenerDatosAforo: function (req, res) {
        getAforo(ID_AFORO).then(datosObtenidos => {
            if (!datosObtenidos) {
                return res.status(404).send({ mensaje: 'No Hay datos' });
            }
            else {
                res.status(200).send(datosObtenidos);
            }
        }).catch(error => res.status(500).send({ mensaje: 'Error al obtener los datos: ' + error }))
    },

    actualizarAforo: function(req, res) {
        let datoDeAforo = new schemaBD();
        datoDeAforo = req.body;
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
        //obtener el objeto aforo
        getAforo(ID_AFORO).then(datosObtenidos => {
            if (!datosObtenidos) {
                return res.status(404).send({ mensaje: 'No Hay datos' });
            }
            else {

                const { id,
                     cuposDisponibles,
                      ocupacionActual,
                       aforo } = datosObtenidos;
                 if (cuposDisponibles <= aforo ) {
                    
                    if  (!ocupacionActual > 0) {
                        return res.status(404).send({ mensaje: 'No se pudo aumentar los cupos disponibles, no hay nadie Adentro' });
                        }
                    const cuposDisponibles = { $inc: { "cuposDisponibles": 1, "ocupacionActual": -1 } };
                    schemaBD.findOneAndUpdate(ID_AFORO, cuposDisponibles, { new: true }, (error, cuposDisponiblesActualizado) => {
                        if (error) {
                            return res.status(500).send({ mensaje: 'Error al aumentar los cupos disponibles: ' + error });
                        } else if (!cuposDisponiblesActualizado) {
                            return res.status(404).send({ mensaje: 'No se pudo aumentar los cupos disponibles' });
                        }
                        return res.status(200).send(cuposDisponiblesActualizado);
                    });
                 }
                 else {
                     return res.status(404).send({ mensaje: 'No se pudo aumentar los cupos disponibles, no hay cupos disponibles' });
                 }

            }
        }).catch(error => res.status(500).send({ mensaje: 'Error al obtener los datos: ' + error }))
    },
    disminuirCuposDisponibles: function (req, res) {
        getAforo(ID_AFORO).then(datosObtenidos => {
            if (!datosObtenidos) {
                return res.status(404).send({ mensaje: 'No Hay datos' });
            }
            else {

                const { id,
                    //  cuposDisponibles,
                      ocupacionActual, aforo } = datosObtenidos;
                // if (cuposDisponibles > 0) {
                    const cuposDisponibles = { $inc: { "cuposDisponibles": -1, "ocupacionActual": 1 } };
                    schemaBD.findOneAndUpdate(ID_AFORO, cuposDisponibles, { new: true }, (error, cuposDisponiblesActualizado) => {
                        if (error) {
                            return res.status(500).send({ mensaje: 'Error al disminuir los cupos disponibles: ' + error });
                        } else if (!cuposDisponiblesActualizado) {
                            return res.status(404).send({ mensaje: 'No se pudo disminuir los cupos disponibles' });
                        }
                        return res.status(200).send(cuposDisponiblesActualizado);
                    });
                // }
                // else {
                //     return res.status(404).send({ mensaje: 'No se pudo disminuir los cupos disponibles, no hay cupos disponibles' });
                // }

            }
        }).catch(error => res.status(500).send({ mensaje: 'Error al obtener los datos: ' + error }))
    },
}

module.exports = controller;