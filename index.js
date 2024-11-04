const express = require('express')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const bodyParser = require('body-parser');
const fs = require('fs')
const mongoose = require('mongoose')


// Middleware para parsear los datos del formulario


const app = express()
const httpServer = app.listen('8080', () => {
    console.log("Server Activo")
})
const socketServer = new Server(httpServer)

mongoose.connect('mongodb+srv://christianbinotto:<db_password>@cluster0.z011g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', (error) => {
    if(error){
        console.log("No se puede conectar a la base de datos: " + error)
        process.exit()
    }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(require('./routes/carts'))
app.use(require('./routes/products'))
app.use(require('./routes/views'))

socketServer.on('connection', socket =>{
    console.log('Socket Conectado')
    app.set('socketServer', socketServer);
    
    socket.on('message', data=>{
        console.log("Servidor: ", data)
    })
        
})