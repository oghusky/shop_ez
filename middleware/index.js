const decode = require("jwt-decode"),
    User = require("../models/User"),
    Store = require("../models/Store");

// checks is user logged in 
exports.isLoggedIn = async (req, res, next) => {
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
}

// checks if user tyring to access route is user that's logged in
exports.isOwner = async (req, res, next) => {
    const token = req.headers.authorization;
    const tokenId = decode(token).data._id;
    console.log("is owner");
    if (tokenId === req.params.userId) next();
    else return res.status(403).json({ msg: "You aren't authorized" });
}

// checks if user type is admin
exports.isAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    const tokenId = decode(token).data._id;
    const user = await User.findById(tokenId);
    console.log("is admin")
    if (user?.userType === "admin") {
        req.userId = String(user._id);
        next()
    }
    else return res.status(403).json({ msg: "You aren't an admin" });
}

exports.isStoreOwner = async (req, res, next) => {
    const token = req.headers.authorization;
    const tokenId = decode(token).data._id;
    const stores = await Store.find({ adminId: String(tokenId) });
    console.log(stores);
    if (stores.length > 0) next();
    else return res.status(403).json({ msg: "You aren't and admin" })
}