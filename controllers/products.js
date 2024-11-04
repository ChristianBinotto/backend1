const fs = require('fs')
const _ = require('lodash')
//const socketServer = require('../index')
const { addProductsSchema, updateProductsSchema } = require('../expressValidator')
const Product = require('../models/product')

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
                res.status(200).send({message: 'OK', product: req.body })
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

async function getProducts(req, res){
    
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
    const query = req.query.query ? req.query.query : {}
    const sort = req.query.sort ? req.query.sort : {}

   /* if(!limit)
        limit = 10
    else(Number.isNan(limit))
        res.status(400).render('home', "Valor inválido en limit, debe ser un número")

    if(!page)
        page = 1
    else(Number.isNan(page))
        res.status(400).render('home', "Valor inválido en page, debe ser un número")

    if(sort != "asc" && sort != "desc" && !sort)
        res.status(400).render('home', "Valor inválido en sort, debe ser asc, desc o vacío")
*/
    try{
        let products = await Product.find(query)
        .limit(limit) 
        .skip(page) 
        .sort(sort) 
        .lean()
        console.log(products)
        if(!products)
            return res.status(404).render('home', 'El archivo está vacío')
        
        if(products.length > 0){
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

async function getProductsById(req, res){
    const id = parseInt(req.params.pid)
    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')

        if(!products)
            return res.status(404).send({message: 'El archivo está vacío'})
        
        products = JSON.parse(products)
        const index = _.findIndex(products, (product) => product.id === id)
    
        if(index > -1){
            res.status(200).json({product: products[index]})
            return products[index]
        }
        else
            res.status(400).send({message: "Producto no encontrado"})
    }
    catch(e){
        res.status(400).send({message: e.message})
    }
}

async function updateProducts(req, res){
    const { error } = updateProductsSchema.validate(req.body)
    if(error)
        return res.status(400).send(error);

    const socketServer = req.app.get('socketServer');
    const id = parseInt(req.params.pid)
    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
        products = JSON.parse(products)
        const index = _.findIndex(products, (product) => product.id === id)
        
        if(index > -1){
            products[index] = req.body
            socketServer.emit('productUpdated', products)
            products = JSON.stringify(products)
            await fs.promises.writeFile('files/products.json', products)
            res.status(200).send({message: 'OK'})
        }
        else
            res.status(400).send({message: "Producto no Encontrado"})
    }
    catch(err){
        res.status(400).send({message: err.message})
    }
}

async function deleteProducts(req, res){
    const id = parseInt(req.params.pid)

    const socketServer = req.app.get('socketServer');

    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
        products = JSON.parse(products)
        const index = _.findIndex(products, (product) => product.id === id)
        if(index > -1){
            products.splice(index, 1)
            socketServer.emit('productUpdated', products)
            products = JSON.stringify(products)
            await fs.promises.writeFile('files/products.json', products)
            res.status(200).send({message: 'OK'})
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
    getProducts,
    getProductsById,
    updateProducts,
    deleteProducts
}