const express = require('express');
const QuizController = require("../controllers/QuizController");
const router = express.Router();

router.post('/crearQuiz', QuizController.crearQuiz);
//router.get('/JugarQuiz/:id', QuizController.JugarQuiz);
router.post('/JugarQuiz/:id', QuizController.JugarQuiz);

module.exports = router;//exporar el routers