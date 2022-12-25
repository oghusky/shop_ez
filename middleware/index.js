const decode = require("jwt-decode"),
    User = require("../models/User"),
    Store = require("../models/Store");
const Product = require("../models/Product");

// checks is user logged in 
exports.isLoggedIn = async (req, res, next) => {
    try {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        console.log("is logged in")
        const token = req.headers.authorization;
        const tokenId = decode(token).data._id;
        const user = await User.findById(tokenId);
        if (token && user?.email) {
            req.userId = String(user._id);
            next()
        }
        else return res.status(403).json({ msg: "You aren't logged in" });
    } catch (err) { }
}

// checks if user tyring to access route is user that's logged in
exports.isOwner = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenId = decode(token).data._id;
        console.log("is owner");
        if (tokenId === req.params.userId) next();
        else return res.status(403).json({ msg: "You aren't authorized" });
    } catch (err) { }
}

// checks if user type is admin
exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenId = decode(token).data._id;
        const user = await User.findById(tokenId);
        console.log("is admin")
        if (user?.userType === "admin") {
            req.userId = String(user._id);
            next()
        }
        else return res.status(403).json({ msg: "You aren't an admin" });
    } catch (err) { }
}
// chekcs is store is owned by person trying to access route
exports.isStoreOwner = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenId = decode(token).data._id;
        const stores = await Store.find({ adminId: String(tokenId) });
        if (stores.length > 0) next();
        else return res.status(403).json({ msg: "You aren't and admin" })
    } catch (err) { }
}
// checks if this product is in this store
exports.productInStore = async (req, res, next) => {
    try {
        const { storeId, productId } = req.params;
        const token = req.headers.authorization;
        const tokenId = decode(token).data._id;
        const store = await Store.findById(storeId);
        console.log("is product in store")
        // checks if current user owns store
        if (String(store.adminId) === tokenId) {
            // check if store id matches storeid of product
            const product = await Product.find({ _id: productId, storeId: storeId });
            if (product) {
                next();
            }
        } else return res.status(403).json({ msg: "You aren't authorized to do that" });
    } catch (err) {
        console.log(err);
    }
}