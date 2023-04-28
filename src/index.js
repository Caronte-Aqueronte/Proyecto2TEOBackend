const express = require('express');//iniciar express
const mongoose = require('mongoose');//iniciar mongoose

//Requires de rutas
const usuarioRoutes = require('./routes/Usuario.routes');

//Requires respecto a configuraciones del servidor
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');


const app = express();//igualar una constante a expresss
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

//lectura de json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cors
app.use(cors(corsOptions));

//iniciamos la app
async function start() {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/proyecto2teo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });//establec una conexion con la base de datos en mongodb

        console.log("Nos conectamos", db.connection.name);//mensaje de confirmacion
    } catch (error) {
        console.log("Nos nos conectamos");//mensaje de error
    }
}

//iniciar servidor
start();//llamamos la funcion

//haciendo uso de las rutas
app.use('/usuario', usuarioRoutes);//las rutas para los usuarios seran leidas desde localost/usuario/

app.listen(3000);//exuchando por el pueto 3000