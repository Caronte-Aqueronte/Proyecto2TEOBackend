const express = require('express');
const juegoController = require("../controllers/JuegoMemoriaController");
const router = express.Router();

router.post('/crearJuegoMemoria', juegoController.crearJuegoMemoria);//definiendo rutas
router.post('/guardarPunteoMemoria', juegoController.guardarPunteoMemoria);
module.exports = router;//exporar el routers