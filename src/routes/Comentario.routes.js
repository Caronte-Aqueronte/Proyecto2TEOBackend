const express = require('express');
const comentarioController = require("../controllers/ComentarioController");
const router = express.Router();


router.post('/nuevoComentario', comentarioController.nuevoComentario);
router.get('/traerComentariosDeJuego', comentarioController.traerComentariosDeJuego);



module.exports = router;//exporar el routers