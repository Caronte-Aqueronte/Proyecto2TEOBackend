const Juego = require('../models/Juego');
const Punteo = require('../models/Punteo');

const crearJuegoMemoria = async (req, res) => {
    const estructuraDeJuego = req.body;//obtenemos el body con la estructura
    const parejas = estructuraDeJuego.parejas;//extraer las parejas del juego
    const nombre = estructuraDeJuego.nombre;//nombre del juego
    const usuarioCreador = estructuraDeJuego.usuarioCreador;//nombre del usuario juegador creador


    //verificamos que todos los valores esten definidos
    if (!estructuraDeJuego) {
        res.json({ respuesta: "Error, juego con contenido nulo", estado: false });
        return;
    }

    if (!parejas || parejas.length <= 0) {
        res.json({ respuesta: "Error, debe haber al menos una palabra", estado: false });
        return;
    }

    if (!nombre || nombre == "") {
        res.json({ respuesta: "Error, El nombre es nulo", estado: false });
        return;
    }

    if (!usuarioCreador || usuarioCreador == "") {
        res.json({ respuesta: "Error, El nombre es nulo", estado: false });
        return;
    }

    //si todas la validaciones se pasan entonces podemos guardar el juego

    const juegoInsertado = await Juego.insertMany({ usuarioCreador: usuarioCreador, nombre: nombre, tipo: "Memoria", pares: parejas });

    if (juegoInsertado) {
        res.json({ codigoDeJuego: juegoInsertado[0]._id, respuesta: "El juego fue guardado con exito", estado: true });
    } else {
        res.json({ respuesta: "Error, El juego no fue guardado.", estado: false });
    }

}

const guardarPunteoMemoria = async (req, res) => {
    //extraer los datos del juego
    const id = req.body.id;
    const nombreJugador = req.body.jugador;
    const tiempo = req.body.tiempo;
    const punteo = req.body.punteo;

    //validacion de campos que no pueden ser nulos o vacios
    if (!id || id == "" || !nombreJugador || nombreJugador == "" || !tiempo || !punteo) {
        res.json({ estado: false, respuesta: "Parametros vacios." });
        return;
    }

    const tiempoFinalizacion = new Date(tiempo * 1000).toISOString().slice(11, 19); //convierte el tiempo en segundos ha formato hh::mm::ss
    const punteoGuardado = await Punteo.insertMany({ codigoDelJuego: id, usuarioJugador: nombreJugador, punteo: punteo, tiempo: tiempoFinalizacion });

    if (punteoGuardado) {
        res.json({ estado: true, respuesta: "Tu punteo fue de " + 100 });;
    } else {
        res.json({ estado: false, respuesta: "Ocurrio un error inesperado" });;
    }


}


module.exports = {
    crearJuegoMemoria: crearJuegoMemoria,
    guardarPunteoMemoria: guardarPunteoMemoria
}