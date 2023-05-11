
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
                opciones: [{ opcion: String }],
                respuestaCorrecta: String,
            }
        ],
        //preguntas que serviran si el juego es de tipo quizz
        // preguntas: Array,
        //pares que serviran si el juego es de tipo memoria
        pares: [
            {
                contenido: String,
                idPareja: Number,
                volteado: {type: Boolean, default: false},//bandera que indicara en el front si la carta esta volteada o no
                styleExp: {type: String, default: "rotateY(0deg)"}//bandera que indicara en el front si la carta esta volteada o no
            }
        ],

    }
);

module.exports = model('juegos', JuegoSchema);