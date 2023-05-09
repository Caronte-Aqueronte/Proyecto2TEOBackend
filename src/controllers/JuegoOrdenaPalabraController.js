const Juego = require('../models/Juego');
const Punteo = require('../models/Punteo');

const crearJuegoOrdenaPalabra = async (req, res) => {
    const estructuraDeJuego = req.body;//obtenemos el body con la estructura
    console.log(estructuraDeJuego);

    const palabras = estructuraDeJuego.palabras;//extraer las preguntas
    const nombre = estructuraDeJuego.nombre;
    const usuarioCreador = estructuraDeJuego.usuarioCreador;

    if (estructuraDeJuego == null) {
        res.json({ respuesta: "Error, juego con contenido nulo", estado: false });
        return;
    }

    if (!palabras || palabras.length <= 0) {
        res.json({ respuesta: "Error, debe haber al menos una palabra", estado: false });
        return;
    }

    if (!nombre) {
        res.json({ respuesta: "Error, El nombre es nulo", estado: false });
        return;
    }

    const juegoInsertado = await Juego.insertMany({ usuarioCreador: usuarioCreador, nombre: nombre, tipo: "Ordena palabra", palabras: palabras });

    if (juegoInsertado) {
        res.json({ codigoDeJuego: juegoInsertado[0]._id, respuesta: "El juego fue guardado con exito", estado: true });
    } else {
        res.json({ respuesta: "Error, El juego no fue guardado.", estado: false });
    }

}

const iniciarJuegoOrdenaPalabra = async (req, res) => {
    const codigoDeJuego = req.query.codigo;//obtenemos el codigo del juego solicitado
    if (!codigoDeJuego) {
        res.json({ estado: false, respuesta: "Codigo nulo" });
        return;
    }

    //buscamos el juego
    const juegoEncontrado = await Juego.findOne({ _id: codigoDeJuego });


    if (!juegoEncontrado || juegoEncontrado.tipo != "Ordena palabra") {//si el juego no fue encontrado entonces enviamos false
        res.json({ estado: false, respuesta: "Juego no encontrado o no es del tipo Ordena Palabra" });
        return;
    }


    //si el juego se encontro entonces enviamos el juego pero con las palabras desordenadas
    for (let x = 0; x < juegoEncontrado.palabras.length; x++) {
        var objetoPalabra = juegoEncontrado.palabras[x];//obtenemos la palabra contenida en el array
        //obtenemos la palabra obtenida en el objeto palabra
        var palabra = objetoPalabra.palabra;
        //deconstruimos la palabra en partes
        var palabraArray = palabra.split("");
        //mandamos a revolver el array
        desordenarPalabra(palabraArray);
        //construimos un string nuevo con la palabra descompuesta
        var palabraDesordenada = construirNuevaPalabra(palabraArray);

        while (palabraDesordenada == palabra) {//nos aseguramos que la palabra desordenada no sea igual a la palabra ordenada
            desordenarPalabra(palabraArray);
            palabraDesordenada = construirNuevaPalabra(palabraArray);
        }
        //editamos el json de la palabra para adjuntar el nuevo json
        juegoEncontrado.palabras[x]['palabraDesordenada'] = palabraDesordenada;

    }
    res.json(juegoEncontrado.palabras);
}

const calificarJuegoOrdenaPalabra = async (req, res) => {
    const id = req.body.id;
    const respuestas = req.body.respuestas;
    const nombreJugador = req.body.jugador;
    const tiempo = req.body.tiempo;
    //validacion de campos que no pueden ser nulos o vacios
    if (!id || id == "" || !respuestas || !nombreJugador || nombreJugador == "") {
        res.json({ estado: false, respuesta: "Parametros vacios." });
        return;
    }

    //mandamos a buscar el juego que tenga el id mandado
    const juegoEncontrado = await Juego.findById({ _id: id });
    console.log(juegoEncontrado)

    const palabrasJuego = juegoEncontrado.palabras;//extraemos las palabras del juego encontrado


    if (respuestas.length <= 0) {//si no hay respuestas entonces enviamos un 0 como punteo

        res.json({ punteo: 0 });
        guardarRecordDeJugador(0, nombreJugador, id, tiempo);//mandamos a guardar el punteo del jugador
        return;
    }

    var punteo = 0;//el numero de puntos que el usuario logro alcanzar
    for (let x = 0; x < palabrasJuego.length; x++) {//iteramos en cada una de las palabras y verificamos
        if (palabrasJuego[x].palabra == respuestas[x].palabra) {
            punteo++;//sumamos un punto 
        }
    }
    //mandamos a guardar el punteo del usuario juento con el nombre del juagor, el id del juego y el tiempo

    guardarRecordDeJugador(punteo, nombreJugador, id, tiempo)

    res.json({ punteo: punteo });

}

const guardarRecordDeJugador = async (punteo, nombreJugador, codigoDeJuego, tiempo) => {

    const tiempoFinalizacion = new Date(tiempo * 1000).toISOString().slice(11, 19); //convierte el tiempo en segundos ha formato hh::mm::ss
    const punteoGuardado = await Punteo.insertMany({ codigoDelJuego: codigoDeJuego, usuarioJugador: nombreJugador, punteo: punteo, tiempo: tiempoFinalizacion });

    return punteoGuardado;
}

function desordenarPalabra(palabraArray) {
    palabraArray.sort(() => Math.random() - 0.5);
}

function construirNuevaPalabra(palabraArray) {
    var nuevaPalabra = "";
    for (let x = 0; x < palabraArray.length; x++) {
        nuevaPalabra = nuevaPalabra + palabraArray[x];//adjuntamos la letra al string
    }
    return nuevaPalabra;

}





module.exports = {
    crearJuegoOrdenaPalabra: crearJuegoOrdenaPalabra,
    iniciarJuegoOrdenaPalabra: iniciarJuegoOrdenaPalabra,
    calificarJuegoOrdenaPalabra: calificarJuegoOrdenaPalabra
}