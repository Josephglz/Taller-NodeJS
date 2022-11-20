const datosConfig = require('./datosConexion');
const mysql = require('mysql');

const pool = mysql.createPool(datosConfig, (err) => {
    if(err) {
        console.log('Ocurrio un error al conectarse a la BD.');
        console.log(err.message);
        reconectarDB();
    }
    console.log('Conexión exitosa.');
})

let reconectarDB = () => {
    setTimeout(() => {
        pool.getConnection((err) => {
            if(err) {
                console.log('Ocurrio un error al conectarse a la BD.');
                reconectarDB();
            }
            console.log('Conexión exitosa.');
        })
    }, 2000)
}

module.exports = {
    pool,
    mysql
}