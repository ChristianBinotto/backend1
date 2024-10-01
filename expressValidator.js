const { joi } = require('./plugins/expressValidator')

const addProductsSchema = joi.object({
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
    products: joi.array().required()
})


module.exports = {
    addProductsSchema,
    addCartsSchema,
    updateProductsSchema
}