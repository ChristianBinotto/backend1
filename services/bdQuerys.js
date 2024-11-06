const Product = require('../models/product')


async function getProducts(limit, page, sort, query) {
 
    try{
        const products = await Product.find(query)
        .limit(limit) 
        .skip(page) 
        .sort(sort) 
        .lean()

        return products
    }
    catch(e){
        console.log("Error getProducts: ", e)
    }
}

async function getProductsById(uid){

    try{
        const product = await Product.findOne({_id: uid})
        return product
    }
    catch(e){
        console.log("Error getProductsById: ", e)
    }
}

async function updateProducts(id, body, options){

    try{
        const product = await Product.findOneAndUpdate(
            {_id: id}, 
            {
                title: body.title,
                description: body.description,
                code: body.code,
                price: body.price,
                status: body.status,
                stock: body.stock,
                category: body.category
            }, 
            {new: options}
        )

        return product
    }
    catch(e){
        console.log("Error updateProducts: ", e)
    }

    
}

async function deleteProducts(id){

    try{
        const deletedProduct = await Product.findOneAndDelete({_id: id})
    }
    catch(e){
        console.log("Error en deleteProducts: ", e)
    }
}

module.exports = {
    getProducts,
    getProductsById,
    updateProducts,
    deleteProducts
}