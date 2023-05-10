
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const model = mongoose.model;

const JuegoSchema = new Schema(

    {
        usuarioCreador: String,
        nombre: String,//titulo del juego
        tipo: String, //categoria del juego

        //palabras que serviran si en caso el juego es de tipo ordena palabra o es de tipo ahorcado
        palabras: [
            {
                palabra: String,
                pista: String,
                palabraDesordenada: String
            }
        ],

        //palabras que se usaran en caso sea un juego de ahorcado
        palabrasAhorcado: [
            {
                palabra: String,
                pista: String,
            }
        ],

        //Preguntas que se usaran en caso sea un quiz
        preguntasQuiz: [
            {
                //Agrego tres campos, pregunta, opciones de respuesta, y la respuesta correcta
                pregunta: String,
                opciones: [String],
                respuestaCorrecta: String,
            }
        ],
        //preguntas que serviran si el juego es de tipo quizz
       // preguntas: Array,
        //pares que serviran si el juego es de tipo memoria
        pares: Array,

    }
);

module.exports = model('juegos', JuegoSchema);