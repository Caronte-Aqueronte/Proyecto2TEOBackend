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
        { $sort: {  punteo: -1, tiempo: 1 } },
        { $limit: 10 }
    ])

    res.json({ ranking });

}

module.exports = {
    traerRankingDeUnJuego: traerRankingDeUnJuego,
}