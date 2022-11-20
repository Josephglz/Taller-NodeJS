const {
    pool
} = require('./conexion');
const util = require('util');

const query = util.promisify(pool.query).bind(pool);

const consultas = {
    insertarCarpeta: async (datos) => {
        try{
            const res = await query("INSERT INTO carpeta (asignatura, docente, duracion, horario, fecha) VALUES(?, ?, ?, ?, curdate());", [
                datos.txtAsignatura,
                datos.txtDocente,
                datos.txtDuracion,
                datos.txtHorario
            ]);
            if(res.affectedRows > 0) {
                return {
                    status: 200,
                    mensaje: 'Carpeta creada'
                }
            } else {
                return {
                    status: 404,
                    mensaje: 'No se pudo crear la carpeta'
                }
            }
        } catch(err) {
            return {
                status: 500,
                mensaje: err.message
            }
        }
    },
    consultaCarpetas: async () => {
        try{
            const res = await query("SELECT * FROM carpeta");
            if(res.length > 0) {
                return {
                    status: 200,
                    data: res
                }
            } else {
                return {
                    status: 404,
                    data: "No hay carpetas"
                }
            }

        } catch(err) {
            return {
                status: 500,
                error: err.message
            }
        }
    },
    detallesCaperta: async (id) => {
        try {
            const res = await query('SELECT * FROM carpeta WHERE id=?', [id]);
            if(res.length > 0) {
                const res2 = await query('SELECT * FROM imagen WHERE id_c=?', [id]);
                return {
                    status: 200,
                    data: res,
                    imagenes: res2
                }
            } else {
                return {
                    status: 404,
                    data: "No hay información"
                }
            }
        } catch(err) {
            return {
                status: 500,
                data: err.message
            }
        }
    }
}

module.exports = {
    consultas
}