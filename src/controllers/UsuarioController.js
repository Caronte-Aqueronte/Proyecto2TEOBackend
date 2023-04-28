const Usuario = require('../models/Usuario');
const createHash = require('crypto');

const login = async (req, res) => {
    const correoElectronico = req.body.correoElectronico;
    var password =  req.body.password;
    //vemos si los parametros son nulos
    if (correoElectronico == null || password == null ||correoElectronico== "" || password == "") {
        res.json({
            respuesta: "Parametros vacios o nulos.",//si fue mal entonces devolver false
            estado: false
        });
        return;
    }
    //encriptamos la password y seteamos el valor
    password = createHash.createHash('sha256').update(password).digest('hex');//seteamos la contra como una encriptada
    //mandamos a buscar el usuario por su password y su usuario
    const usuarioEncontrado = await Usuario.findOne({ correoElectronico: correoElectronico, password: password });

    if (usuarioEncontrado) {
        res.json({
            respuesta: usuarioEncontrado,//si fue mal entonces devolver false
            estado: true
        });
    } else {
        res.json({
            respuesta: "Credenciales incorrectas.",//si fue mal entonces devolver false
            estado: false
        });
    }
}

const crearUsuario = async (req, res) => {
    const correoElectronico = req.body.correoElectronico;
    var password =  req.body.password;
    const rol =  req.body.rol;

    //vemos si los parametros son nulos
    if (correoElectronico == null || password == null || rol == null|| correoElectronico == "" || password == ""|| rol == "") {
        res.json({
            respuesta: "No se creo el usuario debido ha que hay parametros vacios o nulos.",//si fue mal entonces devolver false
            estado: false
        });
        return;
    }
    //nos aseguramos que rol sea estudiante o profesor
    if(rol != "Estudiante" && rol != "Profesor"){
        res.json({
            respuesta: "No se creo el usuario debido ha que el rol es invalido.",//si fue mal entonces devolver false
            estado: false
        });
        return;
    }

    //encriptamos la password
    password = createHash.createHash('sha256').update(req.body.password).digest('hex');
    //guardamos usuario 
    try {
        const insercion = await Usuario.insertMany({correoElectronico: correoElectronico, password: password, rol:rol}, { upsert: false });
        if (insercion) {//si todo fue bien tonces revolvemos true
            res.json({
                respuesta: "Se creo el usuario con exito.",//si fue mal entonces devolver false
                estado: true
            });
        } else {
            res.json({
                respuesta: "No se creo el usuario.",//si fue mal entonces devolver false
                estado: false
            });
        }
    } catch (MongoBulkWriteError) {
        res.json({
            respuesta: "No se creo el usuario. El correo especificado ya tiene una cuenta.",//si fue mal entonces devolver false
            estado: false
        });
    }
   
}

module.exports = {
    login: login,
    crearUsuario:crearUsuario
}
