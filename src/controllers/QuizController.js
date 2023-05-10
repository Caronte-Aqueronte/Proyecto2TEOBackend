const Juego = require('../models/Juego');
const Punteo = require('../models/Punteo');

//Creo el quiz, el usuario manda una pregunta, varias opciones y la respuesta correcta 
const crearQuiz = async (req, res) => {
    const estructuraDeJuego = req.body;//obtenemos el body con la estructura
    const preguntasQuiz = estructuraDeJuego.preguntasQuiz;//extraer las preguntas
    const nombre = estructuraDeJuego.nombre;//extraer el nombre del juego
    const usuarioCreador = estructuraDeJuego.usuarioCreador;//nombre del usaurrio creadro

    //validar si es nula la estructura de juego
    if (estructuraDeJuego == null) {
        res.json({ respuesta: "Error, juego con contenido nulo", estado: false });
        return;
    }

    //validar que exista almenos una pregunta en el quiz 
    if (!preguntasQuiz || preguntasQuiz.length <= 0) {
        res.json({ respuesta: "Error, debe haber al menos una pregunta", estado: false });
        return;
    }

    //validar que el nombre no sea nulo
    if (!nombre) {
        res.json({ respuesta: "Error, El nombre es nulo", estado: false });
        return;
    }

    //insertar el juego
    const juegoInsertado = await Juego.insertMany({ usuarioCreador: usuarioCreador, nombre: nombre, tipo: "Quiz", preguntasQuiz: preguntasQuiz });

    //responder el estado de creacion del juego
    if (juegoInsertado) {
        res.json({ codigoDeJuego: juegoInsertado[0]._id, respuesta: "El juego fue guardado con exito", estado: true });
    } else {
        res.json({ respuesta: "Error, El juego no fue guardado.", estado: false });
    }

}

//Jugar Quiz
const JugarQuiz = async (req, res) => {
    try {
        const idJuego = req.params.id;
        const nombreJugador = req.body.jugador;
        const tiempo = req.body.tiempo;

        const respuestas = req.body.respuestas;
        //Obtengo el juego desde la BD con el Id
        const juego = await Juego.findById(idJuego);

        //Verifico si el juego existe
        if (!juego) {
            res.json({ respuesta: "El juego no existe", estado: false });
            return;
        }

        //Verifico que sea un quiz
        if (juego.tipo !== "Quiz") {
            res.json({ respuesta: "El juego no es un quiz", estado: false });
            return;
        }

        //Obtengo la lista de preguntas. 
        const preguntasQuiz = juego.preguntasQuiz;
        //Variable para el puntaje 
        let puntajeTotal = 0;

        //Se itera sobre cada pregunta, y recibo la respueseta del usuario, usando el indice de cada pregunta 
        for (let i = 0; i < preguntasQuiz.length; i++) {
            const pregunta = preguntasQuiz[i];
            const respuesta = respuestas[i].respuesta; // Obtenemos la respuesta enviada en el body con el índice correspondiente

            // Verifico si la respuesta es correcta
            if (respuesta == pregunta.respuestaCorrecta) {
                puntajeTotal++;
            }
        }

        //mandamos a guardar el punteo del usuario jugador
        guardarRecordDeJugador(puntajeTotal, nombreJugador, idJuego, tiempo);
        //Finalizo el juego y mando el puntaje total / sobre la cantidad de preguntas del quiz
        res.json({
            respuesta: `Juego finalizado, tu puntaje es de ${puntajeTotal}/${preguntasQuiz.length}`,
            estado: true,
        });
    } catch (error) {
        console.error(error);
        res.json({ respuesta: "Error en el servidor", estado: false });
    }
};


const guardarRecordDeJugador = async (punteo, nombreJugador, codigoDeJuego, tiempo) => {

    const tiempoFinalizacion = new Date(tiempo * 1000).toISOString().slice(11, 19); //convierte el tiempo en segundos ha formato hh::mm::ss
    const punteoGuardado = await Punteo.insertMany({ codigoDelJuego: codigoDeJuego, usuarioJugador: nombreJugador, punteo: punteo, tiempo: tiempoFinalizacion });

    return punteoGuardado;
}



module.exports = {
    crearQuiz: crearQuiz,
    JugarQuiz: JugarQuiz
}