const mongoose = require('mongoose')


const cartCollection = 'products'

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]})

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = cartModel