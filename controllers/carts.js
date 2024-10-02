const fs = require('fs')
const { addCartsSchema } = require('../expressValidator')
const _ = require('lodash')

async function addCarts(req, res){
    const { error } = addCartsSchema.validate(req.body)
    if(error)
        return res.status(400).send(error);
    
    
    if(req.body.products.length > 0)
        return res.status(400).send({ error: "No puede haber productos en un carrito nuevo"});

    try{
        let carts = await fs.promises.readFile('files/carts.json', 'utf8')
        if(carts){
            carts = JSON.parse(carts)
            const maxId = Math.max(...carts.map(cart => cart.id));
            const existeId = carts.some(cart => cart.id === maxId+1)
            
            if(existeId){
                res.status(400).send({ error: "El producto ya existe" })
            }
            else{
                req.body.id = maxId + 1
                carts.push(req.body)
                carts = JSON.stringify(carts)
                try{
                    await fs.promises.writeFile('files/carts.json', carts)
                    res.status(200).send({ message: 'OK' })
                }
                catch(err){
                    res.status(400).send({ error: err.message })
                }
            }

        }
        else{
            req.body.id = 1
            let carts = [req.body]
            carts = JSON.stringify(carts)
            try{
                await fs.promises.writeFile('files/carts.json', carts)
                res.status(200).send({ message: 'OK' })
            }
            catch(err){
                res.status(400).send({ error: err.message })
            }
        }
    }
    catch(err){
        res.status(200).send({ error: err.message})
    }
}

async function getCartsById(req, res){
    const id = parseInt(req.params.cid)
    try{
        let carts = await fs.promises.readFile('files/carts.json', 'utf8')

        if(!carts)
            return res.status(404).send({message: 'El archivo está vacío'})
        
        carts = JSON.parse(carts)
        const index = _.findIndex(carts, (cart) => cart.id === id)
    
        if(index > -1){
            res.status(200).json({cart: carts[index]})
            return carts[index]
        }
        else
            res.status(400).send({message: "Carrito no encontrado"})
    }
    catch(e){
        res.status(400).send({message: e.message})
    }
}

async function addProdToCart(req, res){
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    try{
        let products = await fs.promises.readFile('files/products.json', 'utf8')
        products = JSON.parse(products)
        let carts = await fs.promises.readFile('files/carts.json', 'utf8')
        carts = JSON.parse(carts)

        const pIndex = _.findIndex(products, (product) => product.id === pid)
        const cIndex = _.findIndex(carts, (cart) => cart.id === cid)

        if(cIndex > -1){
            if(pIndex > -1){
                let products = carts[cIndex].products
                const pIndexCart = _.findIndex(products, (product) => product.productId === pid)
                
                if(pIndexCart > -1){
                    products[pIndexCart].quantity++
                }
                else{
                    products.push({productId: pid, quantity: 1})
                }
                carts[cIndex].products = products
                carts = JSON.stringify(carts)
                await fs.promises.writeFile('files/carts.json', carts)
                res.status(200).send({ message: "OK" })

            }
            else{
                res.status(400).send({ error: "No existe ese producto"})       
            }
        }
        else{
            res.status(400).send({ error: "No existe ese carrito"})
        }
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
}

module.exports = {
    addCarts,
    getCartsById,
    addProdToCart
}