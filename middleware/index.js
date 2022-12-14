const decode = require("jwt-decode"),
    User = require("../models/User");

// checks is user logged in 
exports.isLoggedIn = (req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'authorization, Origin, Content-Type, Accept'
    )
    console.log("is logged in")
    const token = req.headers.authorization;
    if (token) next();
    else return res.redirect("back");
}

// checks if user tyring to access route is user that's logged in
exports.isOwner = async (req, res, next) => {
    const token = req.headers.authorization;
    const tokenId = decode(token).data._id;
    console.log("is owner");
    if (tokenId === req.params.userId) next();
    else return res.redirect("back");
}

// checks if user type is admin
exports.isAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    const tokenId = decode(token).data._id;
    const user = await User.findById(tokenId);
    console.log("is admin")
    if(user?.userType === "admin"){
        req.userId = String(user._id);
        next()
    }
    else return res.redirect("back");
}
