const fs = require('fs')
const _ = require('lodash')
//const socketServer = require('../index')
const { getProducts, getProductsById, updateProducts, deleteProducts } = require('../services/bdQuerys')
const { addProductsSchema, updateProductsSchema } = require('../expressValidator')

async function addProducts(req, res){
    const { error } = addProductsSchema.validate(req.body)
    if(error)
        return res.status(400).send(error);
    
    const { title, description, code, price, status, stock, category } = req.body

    const socketServer = req.app.get('socketServer');

    try{
       const lastProduct = await Product.findOne().sort({ idB: -1 }).exec();
       
        if (lastProduct) {
            const idB = lastProduct.idB + 1
            try{
                const response = await Product.create({
                    idB,
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category
                })
//              socketServer.emit('productUpdated', products)

                res.status(200).send({message: 'OK', product: req.body })
            }
            catch(error) {
                res.status(400).send({message: error.message})
            }
            
        } else {
            const idB = 1
            try{
                const response = await Product.create({
                    idB,
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category
                })
                //socketServer.emit('productUpdated', products)
                res.status(200).send({message: 'OK', product: response })
            }
            catch(error) {
                res.status(400).send({message: error.message})
            }
        }
    }
    catch(error) {
        console.log(error);
    }
        
    
}

async function checkProducts(req, res){
    
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
    const query = req.query.query ? req.query.query : {}
    const sort = req.query.sort ? req.query.sort : {}

    try{
        const products = await getProducts(limit, page, sort, query)
        console.log(products)
        
        if(products){
            res.render('home', {products})
            return products
        }
        else
            res.status(400).render('home', "No Hay Productos Cargados")
    }
    catch(e){
        res.status(400).render('home', e.message)
    }
}

async function checkProductsById(req, res){
    const id = parseInt(req.params.pid)
    try{
        const product = await getProductsById(id)
        console.log(product)
        
        if(product){
            res.render('home', {product})
            return product
        }
        else
            res.status(400).render('home', "No Existe el Producto Solicitado")
    }
    catch(e){
        res.status(400).render('home', e.message)
    }
}

async function changeProducts(req, res){
    const { error } = updateProductsSchema.validate(req.body)
    if(error)
        return res.status(400).send(error);

    const socketServer = req.app.get('socketServer');
    const id = parseInt(req.params.pid)
    try{
        let products = await updateProducts(id, req.body, true)
        
        if(products){
            res.status(200).send({message: 'OK', reponse: products})
        }
        else
            res.status(400).send({message: "Producto no Encontrado"})
    }
    catch(err){
        res.status(400).send({message: err.message})
    }
}

async function eliminateProducts(req, res){
    const id = parseInt(req.params.pid)

    const socketServer = req.app.get('socketServer');

    try{
        let product = await deleteProducts(id)
    
        if(product){
            res.status(200).send({message: 'OK', response: product})
        }
        else
            res.status(400).send({message: "Producto no Encontrado"})
    }
    catch(err){
        res.status(400).send({message: err.message})
    }
}

module.exports = {
    addProducts,
    checkProducts,
    checkProductsById,
    changeProducts,
    eliminateProducts
}