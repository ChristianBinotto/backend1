const { Router } = require('express')
const router = Router()
const { ENDPOINTS } = require('../constants')
const realTimeProducts = require('../controllers/views')

router.get(ENDPOINTS.VIEW_PRODUCTS, realTimeProducts)

module.exports = router