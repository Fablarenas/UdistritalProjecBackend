const {response, request } = require('express');

const jwt = require('jsonwebtoken');

const validarJWT = (req = request , res =response,next) => {

const token = req.header('x-token');

if (!token) {
    res.status(404).send({error:"no se encontro ningun token"});
}
try {
    jwt.verify(token,process.env.secretOrPrivateKey);
    next();
} catch (error) {
    res.status(401).send({error:"Token invalido"});
}
}
module.exports = validarJWT