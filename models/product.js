const mongoose = require('mongoose')

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String

})

module.exports = mongoose.model(productCollection, productSchema)
