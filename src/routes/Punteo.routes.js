const express = require('express');
const punteoController = require("../controllers/PunteoController");
const router = express.Router();


router.get('/traerRankingDeUnJuego', punteoController.traerRankingDeUnJuego);
router.get('/traerHistorialDeJuego', punteoController.traerHistorialDeJuego);
router.get('/traerMedallasDeUsuario', punteoController.traerMedallasDeUsuario);
module.exports = router;//exporar el routers