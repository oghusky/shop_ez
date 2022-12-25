const express = require("express");
const multer = require("multer");
const { createStoreImage, createItemImage } = require("../controllers/image-controller");
const storage = multer.diskStorage({
    destination: "./tmp/",
    preservePath: true,
    filename: (req, file, cb) => { // notice the change 'filename'
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
const router = express.Router();
router
    .route("/")
    .post(upload.fields([{ name: "file", maxCount: 1 }]), createStoreImage);

router
    .route("/item")
    .post(upload.fields([{ name: "file", maxCount: 1 }]),createItemImage);

module.exports = router;