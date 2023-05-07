const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const model = mongoose.model;

const PunteoSchema = new Schema(

    {

        codigoDelJuego: mongoose.Types.ObjectId,//juego al que pertenece dicho punteo
        usuarioJugador: String, //id del jugador al que pertenece el punteo
        fecha: { type: String, default: moment().format("YYYY-MM-DD") },//fecha de obtencion del punteo
        punteo: Number// punteo obtenido
    }
);

module.exports = model('punteos', PunteoSchema);