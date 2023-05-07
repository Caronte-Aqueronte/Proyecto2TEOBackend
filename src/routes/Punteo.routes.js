const express = require('express');
const punteoController = require("../controllers/PunteoController");
const router = express.Router();


router.get('/traerRankingDeUnJuego', punteoController.traerRankingDeUnJuego);


module.exports = router;//exporar el routers