require('dotenv').config();

let mongoose = require('mongoose');
let app = require('./app');
let port = process.env.PORT;
let url = 'mongodb+srv://raiders:N418QcDEXf6wT27v@cluster0.ow5hs.mongodb.net/controlAforo?retryWrites=true&w=majority';

const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise;


mongoose.connect(url, config)
    .then(()=>{
        console.log('Conectado exitosamente a la base de datos');
        app.listen(port, ()=>{
            console.log('Servidor corriendo correctamente', port);
        });
    })
    .catch((err)=>{
        console.log(err);
    });