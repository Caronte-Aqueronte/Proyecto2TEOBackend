const Usuario = require('../models/Usuario');
const createHash = require('crypto');

const login = async (req, res) => {
    const correoElectronico = req.body.correoElectronico;
    const password =  req.body.password;
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
            respuesta: "Encontrado.",//si fue mal entonces devolver false
            estado: true
        });
    } else {
        res.json({
            respuesta: "No encontrado.",//si fue mal entonces devolver false
            estado: false
        });
    }
}


module.exports = {
    login: login,
}
