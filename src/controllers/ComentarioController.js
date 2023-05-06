const Comentario = require('../models/Comentario');


const nuevoComentario = async (req, res) => {
    const comentario = req.body;
    if (!comentario) {
        res.send(null);
    }

    const nuevoComentario = await Comentario.insertMany(comentario);
    if (nuevoComentario) {
        res.json({ estado: true });
    } else {
        res.json({ estado: false });
    }
}
const traerComentariosDeJuego = async (req, res) => {
    //extraer el id de query
    const id = req.query.id;

    //verificar que el id no sea nulo o vacio
    if (!id || id == "") {
        res.send(null);
    }

    const comentarios = await Comentario.find({ codigoDelJuego: id });

    res.json(comentarios);
}

module.exports = {
    nuevoComentario: nuevoComentario,
    traerComentariosDeJuego: traerComentariosDeJuego,
}