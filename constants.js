

module.exports = {
    ENDPOINTS: {
        GET_PRODUCTS_BY_ID: '/products/:pid',
        GET_PRODUCTS: '/products',
        ADD_PRODUCTS: '/products',
        UPDATE_PRODUCTS: '/products/:pid',
        DELETE_PRODUCTS: '/products/:pid',
        ADD_CARTS: '/carts',
        GET_CARTS: '/carts/:cid',
        ADD_PRODUCT_CARTS: '/carts/:cid/:pid',
        DELETE_PRODUCT_CART: '/carts/:cid/:pid',
        DELETE_PRODUCTS_CART: '/carts/:cid',
        UPDATE_PRODUCTS_CART: '/carts/:cid',
        UPDATE_PRODUCT_CART: '/carts/:cid/:pid',
        VIEW_PRODUCTS: '/realtimeproducts',
    }
}