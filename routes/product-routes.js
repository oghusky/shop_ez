const router = require("express").Router(),
    { createProduct } = require("../controllers/product-controllers"),
    { isLoggedIn, isStoreOwner } = require("../middleware");

router
    .route("/store/:storeId")
    .post(isLoggedIn, isStoreOwner, createProduct);

module.exports = router;