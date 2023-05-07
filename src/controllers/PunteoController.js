const Punteo = require('../models/Punteo');


const traerRankingDeUnJuego = async (req, res) => {
    const id = req.query.id

    if (!id || id == "") {
        res.json({});
    }

    const ranking = await Punteo.aggregate([
        { $match: { codigoDelJuego: id } },//filtra por fechas de compra
        { $sort: { punteo: -1 } },
        { $limit: 10 }
    ])

    res.json({ ranking });

}

module.exports = {
    traerRankingDeUnJuego: traerRankingDeUnJuego,
}