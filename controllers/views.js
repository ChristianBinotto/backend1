const { getProducts } = require('./products')
const fs = require('fs')


async function realTimeProducts(req, res) {
    let products = await fs.promises.readFile('files/products.json', 'utf8')
    products = JSON.parse(products)
    console.log(products)
    res.render('realTimeProducts',{ products })
}

module.exports = realTimeProducts