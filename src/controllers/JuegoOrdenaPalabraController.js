const Juego = require('../models/Juego');
const Usuario = require('../models/Juego');

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
}