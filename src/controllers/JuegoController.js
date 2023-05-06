const Juego = require('../models/Juego');

const mostrarJuegos = async (req, res) => {
    const juegos = await Juego.find();
    res.json(juegos);
}

const buscarJuegoPorId = async (req, res) => {
    //extraer el id de query
    const id = req.query.id;

    //verificar que el id no sea nulo o vacio
    if (!id || id == "") {
        res.json({});
    }

    const juegoEncontrado = await Juego.findById({_id:id});

    res.json(juegoEncontrado);
}

module.exports = {
    mostrarJuegos: mostrarJuegos,
    buscarJuegoPorId:buscarJuegoPorId
}