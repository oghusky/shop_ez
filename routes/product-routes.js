const router = require("express").Router(),
    { createProduct, getProductsByStoreId } = require("../controllers/product-controllers"),
    { isLoggedIn, isStoreOwner } = require("../middleware");

router
    .route("/store/:storeId")
    .get(getProductsByStoreId)
    .post(isLoggedIn, isStoreOwner, createProduct);

module.exports = router;