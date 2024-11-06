const { Router } = require('express')
const router = Router()
const { ENDPOINTS } = require('../constants')
const { addProducts, checkProducts, checkProductsById, changeProducts, eliminateProducts } = require('../controllers/products')

router.post(ENDPOINTS.ADD_PRODUCTS, addProducts)
router.get(ENDPOINTS.GET_PRODUCTS, checkProducts)
router.get(ENDPOINTS.GET_PRODUCTS_BY_ID, checkProductsById)
router.put(ENDPOINTS.UPDATE_PRODUCTS, changeProducts)
router.delete(ENDPOINTS.DELETE_PRODUCTS, eliminateProducts)

module.exports = router