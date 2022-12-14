const {createStore,getStoreById,getAllStores,findStoresByUserId,updateStoreById,deleteStore} = require("../controllers/store-controllers"),
{isAdmin,isLoggedIn,isOwner} = require("../middleware/index"),
router = require("express").Router();
router
.route("/")
.get(getAllStores)
.post(isLoggedIn,createStore);
module.exports = router;