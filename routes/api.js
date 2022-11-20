const express = require('express');
const router = express.Router();
const db = require('../db/consultas')
router.use(express.json())

router.post('/api/carpetas', (req, res) => {
    db.consultas.consultaCarpetas()
    .then((result) => {
        if(result.status == 200) {
            res.json(result.data);
        } else {
            res.json(result.data)
        }
    })
    .catch((err) => {
        res.json(err.message)
    })
})

router.post('/api/carpetas/create', (req, res) => {
    db.consultas.insertarCarpeta(req.body)
    .then((result) => {
        if(result.status == 200) {
            res.json(result.mensaje)
        } else {
            res.json(result.mensaje)
        }
    })
    .catch((err) => {
        res.json(err.message)
    })
})

module.exports = router;