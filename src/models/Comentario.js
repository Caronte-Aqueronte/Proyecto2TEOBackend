const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const model = mongoose.model;

const ComentarioSchema = new Schema(

    {

        codigoDelJuego: mongoose.Types.ObjectId,//juego al que pertenece dicho comentario
        usuarioJugador: String, //id del jugador al que pertenece el comentario
        fecha: { type: String, default: moment().format("YYYY-MM-DD") },//fecha de obtencion del comentario
        comentario: String, //contenido del comentario 
    }
);

module.exports = model('comentarios', ComentarioSchema);