const express = require('express');
const juegoController = require("../controllers/JuegoController");
const router = express.Router();

router.get('/mostrarJuegos', juegoController.mostrarJuegos);
router.get('/buscarJuegoPorId', juegoController.buscarJuegoPorId);
router.get('/mostrarJuegosDeDocente', juegoController.mostrarJuegosDeDocente);


module.exports = router;//exporar el routers