const express = require('express');
const router = express.Router();
const db = require('../db/consultas')
router.use(express.json())

router.get('/', (req, res) => {
    db.consultas.consultaCarpetas()
    .then((result) => {
        res.render('index', 
        {
            status: result.status == 200 ? 1 : 0,
            data: result.data
        })
    })
    .catch((err) => {
        res.json(err.error);
    })
})

router.get('/detalles/:id' , (req, res) => {
    db.consultas.detallesCaperta(req.params.id)
    .then((result) => {
        if(result.status == 200) {
            res.render('detalles', 
            {
                data: result.data[0],
                imgCont: result.imagenes.length == 0 ? 0 : 1,
                imagenes: result.imagenes
            })
        } else {
            res.json(result.data)
        }
    })
})

router.get('/create', (req, res) => {
    res.render('create')
})

module.exports = router;