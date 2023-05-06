const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const model = mongoose.model;

const PunteoSchema = new Schema(

    {
         
        codigoDelJuego:String,//juego al que pertenece dicho punteo
        usuarioJugador: mongoose.Types.ObjectId, //id del jugador al que pertenece el punteo
        fecha: String,//fecha de obtencion del punteo
        punteo: Number// punteo obtenido
    }
);

module.exports = model('punteos', PunteoSchema);