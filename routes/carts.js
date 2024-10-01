const { Router } = require('express')
const router = Router()
const { ENDPOINTS } = require('../constants')
const { addCarts, getCartsById, addProdToCart } = require('../controllers/carts')

router.post(ENDPOINTS.ADD_CARTS, addCarts)
router.get(ENDPOINTS.GET_CARTS, getCartsById)
router.post(ENDPOINTS.ADD_PRODUCT_CARTS, addProdToCart)

module.exports = router