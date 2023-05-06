const express = require('express');
const juegoController = require("../controllers/JuegoController");
const router = express.Router();

router.get('/mostrarJuegos', juegoController.mostrarJuegos);
router.get('/buscarJuegoPorId', juegoController.buscarJuegoPorId);


module.exports = router;//exporar el routers