const schemaBD = require('../models/aforo.model');
const schemaBDUsuario = require('../models/usuario.model');
const generateJWT = require('../helpers/generate-jwt')
const bcryptjs = require('bcryptjs');
const ID_AFORO = {_id : 2021};
const obtenerCredencialesUsuarioAdmin = (id) => {
    const obj = {_id : id}
    return new Promise((resolve, reject) => {
       
        schemaBDUsuario.findById(obj, (error, datosObtenidos) => {
            if (error) {
                reject(error);
            } else if (!datosObtenidos) {
                console.log(datosObtenidos);
                resolve(datosObtenidos);
            }
            console.log(datosObtenidos);
            return resolve(datosObtenidos);
        });
    });
}

const ObtenerAforo = (id) => {

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
        ObtenerAforo(ID_AFORO).then(datosObtenidos => {
            if (!datosObtenidos) {
                return res.status(404).send({ mensaje: 'No Hay datos' });
            }
            else {
                res.status(200).send(datosObtenidos);
            }
        }).catch(error => res.status(500).send({ mensaje: 'Error al obtener los datos: ' + error }))
    },

    actualizarAforo: function(req, res) {
        const token = req.header('x-token');
        console.log(token);
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
        ObtenerAforo(ID_AFORO).then(datosObtenidos => {
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
        ObtenerAforo(ID_AFORO).then(datosObtenidos => {
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
    login: async function (req, res) {

        const{nombre,contraseña} = req.body;
        try {
        //buscar usuario y contraseña
        const usuario = await obtenerCredencialesUsuarioAdmin(process.env.idUser);
        // verificar contraseña
        const validPassword = bcryptjs.compareSync( contraseña, usuario.contrasena );
        // verificar contraseña
        if (nombre != usuario.nombre || !validPassword) {
            return res.json({error: "usuario o contraseña incorrecta"});
        }
        const tokenauth = await generateJWT.generarJWT('algo');
        res.json({
            token:tokenauth
        });
        } catch (error) {
            return res.json({error: error});
        }
        // getAforo(ID_AFORO).then(datosObtenidos => {
        //     if (!datosObtenidos) {
        //         return res.status(404).send({ mensaje: 'No Hay datos' });
        //     }
        //     else {

        //         const { id,
        //             //  cuposDisponibles,
        //               ocupacionActual, aforo } = datosObtenidos;
        //         // if (cuposDisponibles > 0) {
        //             const cuposDisponibles = { $inc: { "cuposDisponibles": -1, "ocupacionActual": 1 } };
        //             schemaBD.findOneAndUpdate(ID_AFORO, cuposDisponibles, { new: true }, (error, cuposDisponiblesActualizado) => {
        //                 if (error) {
        //                     return res.status(500).send({ mensaje: 'Error al disminuir los cupos disponibles: ' + error });
        //                 } else if (!cuposDisponiblesActualizado) {
        //                     return res.status(404).send({ mensaje: 'No se pudo disminuir los cupos disponibles' });
        //                 }
        //                 return res.status(200).send(cuposDisponiblesActualizado);
        //             });
        //         // }
        //         // else {
        //         //     return res.status(404).send({ mensaje: 'No se pudo disminuir los cupos disponibles, no hay cupos disponibles' });
        //         // }

        //     }
        // }).catch(error => res.status(500).send({ mensaje: 'Error al obtener los datos: ' + error }))
    },
}

module.exports = controller;