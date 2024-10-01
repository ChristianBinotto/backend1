const { Router } = require('express')
const router = Router()
const { ENDPOINTS } = require('../constants')
const { addProducts, getProducts, getProductsById, updateProducts, deleteProducts } = require('../controllers/products')

router.post(ENDPOINTS.ADD_PRODUCTS, addProducts)
router.get(ENDPOINTS.GET_PRODUCTS, getProducts)
router.get(ENDPOINTS.GET_PRODUCTS_BY_ID, getProductsById)
router.put(ENDPOINTS.UPDATE_PRODUCTS, updateProducts)
router.delete(ENDPOINTS.DELETE_PRODUCTS, deleteProducts)

module.exports = router