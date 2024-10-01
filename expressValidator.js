const { joi } = require('./plugins/expressValidator')

const addProductsSchema = joi.object({
    id: joi.number().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    code: joi.string().required(),
    price: joi.number().required(),
    status: joi.boolean().required(),
    stock: joi.number().required(),
    category: joi.string().required(),
    thumbnails: joi.array()
})

const updateProductsSchema = joi.object({
    id: joi.number().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    code: joi.string().required(),
    price: joi.number().required(),
    status: joi.boolean().required(),
    stock: joi.number().required(),
    category: joi.string().required(),
    thumbnails: joi.array()
})

const addCartsSchema = joi.object({
    id: joi.number().required(),
    products: joi.array().required()
})

/*const addProdToCart = joi.object({
    id: joi.number().required(),
    productId: joi.number().required()
})*/

module.exports = {
    addProductsSchema,
    addCartsSchema,
    updateProductsSchema
}