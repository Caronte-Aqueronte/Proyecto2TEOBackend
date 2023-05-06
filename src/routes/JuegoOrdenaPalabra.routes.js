const express = require('express');
const juegoController = require("../controllers/JuegoOrdenaPalabraController");
const router = express.Router();

router.post('/crearJuegoOrdenaPalabra', juegoController.crearJuegoOrdenaPalabra);//definiendo rutas
router.get('/iniciarJuegoOrdenaPalabra', juegoController.iniciarJuegoOrdenaPalabra);

module.exports = router;//exporar el routers