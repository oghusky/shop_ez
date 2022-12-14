const { createStore, getStoreById, getAllStores, findStoresByUserId, updateStoreById, getStoresByName, deleteStore } = require("../controllers/store-controllers"),
    { isAdmin, isLoggedIn, isOwner, isStoreOwner } = require("../middleware/index"),
    router = require("express").Router();
router
    .route("/")
    .get(getAllStores)
    .post(isLoggedIn, createStore);

router
    .route("/id/:storeId")
    .put(isLoggedIn, isStoreOwner, updateStoreById)
    .delete(isLoggedIn, isStoreOwner, deleteStore)
    .get(getStoreById);

router
    .route("/user/:userId")
    .get(findStoresByUserId);

router
.route("/name/:storeName")
.get(getStoresByName);

module.exports = router;