const mongoose = require('mongoose')

//const productCollection = 'products'

const productSchema = new mongoose.Schema({
    idB: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String

})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


module.exports = Product
