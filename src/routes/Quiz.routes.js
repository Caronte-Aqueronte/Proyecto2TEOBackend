const express = require('express');
const QuizController = require("../controllers/QuizController");
const router = express.Router();

router.post('/crearQuiz', QuizController.crearQuiz);
//router.get('/JugarQuiz/:id', QuizController.JugarQuiz);
router.post('/JugarQuiz/:id', QuizController.JugarQuiz);
router.get('/JugarQuiz/:id/preguntas', QuizController.JugarQuizPreguntas);
router.post('/JugarQuiz/:id/respuestas', QuizController.JugarQuizPreguntas);


module.exports = router;//exporar el routers