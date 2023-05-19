const { default: mongoose } = require('mongoose');
const Punteo = require('../models/Punteo');


const traerRankingDeUnJuego = async (req, res) => {
    const id = req.query.id

    if (!id || id == "") {
        res.json({});
    }

    var idConvert = new mongoose.Types.ObjectId(id);

    const ranking = await Punteo.aggregate([
        { $match: { codigoDelJuego: idConvert } },//filtra por fechas de compra
        { $sort: { punteo: -1, tiempo: 1 } },
        { $limit: 10 }
    ])

    res.json({ ranking });

}



const traerHistorialDeJuego = async (req, res) => {
    const nombreUsuario = req.query.usuario

    if (!nombreUsuario || nombreUsuario == "") {
        res.json({});
    }

    const historial = await Punteo.aggregate([
        { $lookup: { from: 'juegos', localField: 'codigoDelJuego', foreignField: '_id', as: 'juego' } },
        { $match: { usuarioJugador: nombreUsuario } },//filtra por fechas de compra
        { $sort: { tiempo: -1 } },
    ])

    res.json({ historial });

}

const traerMedallasDeUsuario = async (req, res) => {
    const nombreUsuario = req.query.usuario //traer el parametro del nombre de usuario dentro de url
    const medallasUsuario = [];
    if (!nombreUsuario || nombreUsuario == "") {//comparamos si es vacio o nulo
        res.json({});
    }


    //Para juego ordena palabra
    const totalPuntosOrdenaPalabra = await Punteo.aggregate([
        { $lookup: { from: 'juegos', localField: 'codigoDelJuego', foreignField: '_id', as: 'juego' } },
        { $unwind: "$juego" }, //desenvuelve todos los arrays de articulos de los pedidos que coincidan en fechas
        { $match: { usuarioJugador: nombreUsuario, "juego.tipo": "Ordena palabra" } },//filtra por fechas de compra
        { $group: { _id: "juego.tipo", punteo: { $sum: "$punteo" }/*devuelve la informacion del primer elemento de group*/ } },
    ])

    if (totalPuntosOrdenaPalabra[0].punteo >= 10) {
        medallasUsuario.push({ nombreMedalla: "Medalla de juego Ordena Palabra", imgMedalla: "medalla3", punteoTotal: totalPuntosOrdenaPalabra[0].punteo });
    }

    //Para juego ahorcado
    const totalPuntosAhorcado = await Punteo.aggregate([
        { $lookup: { from: 'juegos', localField: 'codigoDelJuego', foreignField: '_id', as: 'juego' } },
        { $unwind: "$juego" }, //desenvuelve todos los arrays de articulos de los pedidos que coincidan en fechas
        { $match: { usuarioJugador: nombreUsuario, "juego.tipo": "Ahorcado" } },//filtra por fechas de compra
        { $group: { _id: "juego.tipo", punteo: { $sum: "$punteo" }/*devuelve la informacion del primer elemento de group*/ } },
    ])

    if (totalPuntosAhorcado[0].punteo >= 10) {
        medallasUsuario.push({ nombreMedalla: "Medalla de juego Ahorcado", imgMedalla: "medalla1", punteoTotal: totalPuntosAhorcado[0].punteo });
    }


    //Para juego ahorcado
    const totalPuntosQuiz = await Punteo.aggregate([
        { $lookup: { from: 'juegos', localField: 'codigoDelJuego', foreignField: '_id', as: 'juego' } },
        { $unwind: "$juego" }, //desenvuelve todos los arrays de articulos de los pedidos que coincidan en fechas
        { $match: { usuarioJugador: nombreUsuario, "juego.tipo": "Quiz" } },//filtra por fechas de compra
        { $group: { _id: "juego.tipo", punteo: { $sum: "$punteo" }/*devuelve la informacion del primer elemento de group*/ } },
    ])

    if (totalPuntosQuiz[0].punteo >= 10) {
        medallasUsuario.push({ nombreMedalla: "Medalla de juego Quiz", imgMedalla: "medalla4", punteoTotal: totalPuntosQuiz[0].punteo });
    }


    //Para juego ahorcado
    const totalPuntosMemoria = await Punteo.aggregate([
        { $lookup: { from: 'juegos', localField: 'codigoDelJuego', foreignField: '_id', as: 'juego' } },
        { $unwind: "$juego" }, //desenvuelve todos los arrays de articulos de los pedidos que coincidan en fechas
        { $match: { usuarioJugador: nombreUsuario, "juego.tipo": "Memoria" } },//filtra por fechas de compra
        { $group: { _id: "juego.tipo", punteo: { $sum: "$punteo" }/*devuelve la informacion del primer elemento de group*/ } },
    ])

    if (totalPuntosMemoria[0].punteo >= 1000) {

        medallasUsuario.push({ nombreMedalla: "Medalla de juego Memoria", imgMedalla: "medalla2", punteoTotal: totalPuntosMemoria[0].punteo });
    }
    res.json({ medallasUsuario });
}

module.exports = {
    traerRankingDeUnJuego: traerRankingDeUnJuego,
    traerHistorialDeJuego: traerHistorialDeJuego,
    traerMedallasDeUsuario: traerMedallasDeUsuario
}