const express = require('express')

const app = express()

app.use(express.json())

app.use(require('./routes/carts'))
app.use(require('./routes/products'))

app.listen('8080')