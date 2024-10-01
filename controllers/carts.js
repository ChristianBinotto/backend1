const fs = require('fs')
const { addCartsSchema } = require('../expressValidator')

async function addCarts(req, res){
    const { error } = addCartsSchema.validate(req.body)
    if(error)
        return res.status(400).send(error);

    let content = await fs.promises.readFile('files/carts.json', 'utf8')
    console.log(JSON.parse(content))
}

async function getCarts(req, res){

}

async function addProdToCart(req, res){

}

module.exports = {
    addCarts,
    getCarts,
    addProdToCart
}