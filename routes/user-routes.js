const router = require('express').Router(),
    {
        isLoggedIn,
        isOwner
    } = require("../middleware"),
    {
        login,
        createUser,
        updateUser,
        deleteUser,
        findUserById,
    } = require("../controllers/user-controllers");
router
    .route("/")
    .post(createUser);
router
    .route("/login")
    .post(login);
router
    .route("/id/:userId")
    .put(isLoggedIn, isOwner, updateUser)
    .get(isLoggedIn, isOwner, findUserById)
    .delete(isLoggedIn, isOwner, deleteUser);

module.exports = router;
