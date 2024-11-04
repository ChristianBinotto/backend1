const { Router } = require('express')
const router = Router()
const { ENDPOINTS } = require('../constants')
const { addCarts, getCartsById, addProdToCart, deleteProdFromCart, deleteCart, updateCart, updateProductFromCart } = require('../controllers/carts')

router.post(ENDPOINTS.ADD_CARTS, addCarts)
router.get(ENDPOINTS.GET_CARTS, getCartsById)
router.post(ENDPOINTS.ADD_PRODUCT_CARTS, addProdToCart)
router.delete(ENDPOINTS.DELETE_PRODUCT_CART, deleteProdFromCart)
router.delete(ENDPOINTS.DELETE_PRODUCTS_CART, deleteCart)
router.put(ENDPOINTS.UPDATE_PRODUCTS_CART, updateCart)
router.put(ENDPOINTS.UPDATE_PRODUCT_CART, updateProductFromCart)

module.exports = router