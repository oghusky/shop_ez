const Image = require("../models/Image"),
    fs = require("fs"),
    path = require("path"),
    { transformBuffer } = require("../utils/transformBuffer"),
    { s3Upload, deleteFileFromS3, getFileFromS3 } = require("../utils/awsS3");

exports.createStoreImage = async (req, res) => {
    const { bucketName, forModel, modelId, imageType } = req.body;
    const { file } = req.files;
    console.log(file);
    let storeId,
        productId;
    try {
        if (forModel === "store") {
            storeId = modelId
        } else productId = modelId
        await s3Upload(bucketName, file[0].path, "", imageType, storeId, productId);
        return res.status(201).json({ msg: "Image uploaded" })
    } catch (err) {
        console.log(err);
    }
}

exports.createItemImage = async (req, res) => {
    const { bucketName, storeId, modelId, imageType } = req.body;
    const { file } = req.files;
    try {
        await s3Upload(bucketName, file[0].path, "", imageType, storeId, modelId);
        return res.status(201).json({ msg: "Image uploaded" });
    } catch (err) { }
}

exports.getImageByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        console.log(productId)
        const image = await Image.find({ productId });
        return res.status(200).json({ msg: "Found Image", image })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ msg: "Unable to find image" })
    }
}

exports.getImagesByStoreId = async (req, res) => {
    const { storeId } = req.params;
    console.log(storeId);
    try {
        const images = await Image.find({ storeId });
        return res.status(200).json({ msg: "Found Images", images });
    } catch (err) {
        console.log(err);
        return res.status(404).json({ msg: "Unable to get images" });
    }
}