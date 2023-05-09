const express = require('express');
const juegoAhorcadoController = require("../controllers/JuegoahorcadoController");
const router = express.Router();

router.post('/crearJuegoAhorcado', juegoAhorcadoController.crearJuegoAhorcado);
router.post('/guardarPunteoAhorcado', juegoAhorcadoController.guardarPunteoAhorcado);

module.exports = router;//exporar el routers