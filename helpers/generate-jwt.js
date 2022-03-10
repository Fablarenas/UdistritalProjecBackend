const jwt = require ('jsonwebtoken');

const generarJWT =(uid='')=>{
return new Promise ((resolve,reject)=>{
    const payload = {uid};
    jwt.sign(payload,process.env.secretOrPrivateKey,{
        expiresIn:"60s"
    },(err,token)=>{
        if (err) {
            console.log('error', err);
            reject( 'no se pudo generar el token' );
        }else{
            resolve(token)
        }
    })
})
}

module.exports={
    generarJWT
}