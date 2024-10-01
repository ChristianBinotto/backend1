const fs = require('fs')
const _ = require('lodash')
const { addProductsSchema, updateProductsSchema } = require('../expressValidator')


async function addProducts(req, res){
    const { error } = addProductsSchema.validate(req.body)
    if(error)
        return res.status(400).send(error);


    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
        if(products){
            products = JSON.parse(products)
            const maxId = Math.max(...products.map(product => product.id));
            const existeId = products.some(product => product.id === maxId+1)
            
            if(existeId){
                res.status(400).send({ error: "El producto ya existe" })
            }
            else{
                req.body.id = maxId + 1
                products.push(req.body)
                products = JSON.stringify(products)
                try{
                    await fs.promises.writeFile('files/products.json', products)
                    res.status(200).send({ message: 'OK' })
                }
                catch(e){
                    res.status(400).send({message: err.message})
                }
            }
        }
        else{
            req.body.id = 1
            let products = [req.body]
            products = JSON.stringify(products)
            try{
                await fs.promises.writeFile('files/products.json', products)
                res.status(200).send({ message: 'OK' })
            }
            catch(err){
                res.status(400).send({message: err.message})
            }
        }    
    }
    catch(err){
        res.status(400).send({message: err.message})
    }
}

async function getProducts(req, res){
    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
        products = JSON.parse(products)
        
        if(products.length > 0){
            products = products.slice(0, 10 )
            res.status(200).json({products: products})
            return products
        }
        else
            res.status(400).send({message: "No hay productos cargados"})
    }
    catch(e){
        res.status(400).send({message: err.message})
    }
}

async function getProductsById(req, res){
    const id = parseInt(req.params.pid)
    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
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

    const id = parseInt(req.params.pid)
    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
        products = JSON.parse(products)
        const index = _.findIndex(products, (product) => product.id === id)
        
        if(index > -1){
            products[index] = req.body
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

    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
        products = JSON.parse(products)
        const index = _.findIndex(products, (product) => product.id === id)
        if(index > -1){
            products.splice(index, 1)
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