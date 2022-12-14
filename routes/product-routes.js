const router = require("express").Router(),
    { createProduct, getProductsByStoreId, getProductByItemId, updateProduct, deleteProduct, getProductsByProductName } = require("../controllers/product-controllers"),
    { isLoggedIn, isStoreOwner, productInStore } = require("../middleware");

router
    .route("/store/:storeId")
    .get(getProductsByStoreId)
    .post(isLoggedIn, isStoreOwner, createProduct);

router
    .route("/store/:storeId/item/:productId")
    .get(getProductByItemId)
    .put(isLoggedIn, isStoreOwner, productInStore, updateProduct)
    .delete(isLoggedIn, isStoreOwner, productInStore, deleteProduct);

router
    .route("/name/:productName")
    .get(getProductsByProductName)

module.exports = router;