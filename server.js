const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'))
hbs.registerPartials(path.join(__dirname, './views/partials'))

hbs.registerHelper('fecha', (value) => {
    const fecha = new Date(value);
    return fecha.toLocaleDateString();
})

app.use(express.static(path.join(__dirname, './assets')))
app.use(require('./routes/index'))

app.listen((process.env.PORT || 3000), () => {
    console.log('Iniciando Servidor en puerto 3000')
})
.on('listening', () => {
    console.log('Servidor se a iniciado.')
})
.on('error', (err) => {
    console.log('Error en el servidor: ' + err.message)
})
.on('close', () => {
    console.log('El servidor se ha cerrado')
})