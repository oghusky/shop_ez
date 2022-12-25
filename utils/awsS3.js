const res = require("express/lib/response");

const fs = require("fs"),
    path = require("path"),
    util = require('util'),
    AWS = require("aws-sdk"),
    Image = require('../models/Image'),
    s3 = new AWS.S3({ region: "us-east-1" });

var params = {
    Bucket: "shopez"
};

const s3Cors = async () => {
    try {
        s3.getBucketCors(params, (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        })
    } catch (err) { }
}

const s3ListBuckets = async () => {
    try {
        const res = await s3.listBuckets().promise()
        console.log(res.Buckets);
    } catch (err) { }
}

const listFoldersInBucket = async (name) => {
    try {
        const params = {
            Bucket: "shopez",
        }
        const folders = await s3.listObjects(params).promise()
        const found = folders.Contents.filter(item => item.Key.includes(name));
        console.log(found);
    } catch (err) {
        console.log(err);
    }
}

const s3Upload = async (bucketName, file, alias, imageType, storeId, productId) => {
    try {
        console.log(file)
        const fileStream = fs.createReadStream(file);
        const uploadParams = {
            Bucket: `shopez/${bucketName}`,
            Body: fileStream,
            Key: "",
            ACL: "public-read",
        };
        uploadParams.Key = alias || path.basename(file);
        result = await s3.upload(uploadParams).promise();
        if (result) await Image.create({ url: result.Location, imageType, eTag: result.Etag, storeId, productId })
        fs.unlink(path.join(file), (err) => {
            if (err) throw err;
          });
        return result
    } catch (err) {
        console.log("Amazon upload error: ", err);
        return res.status(500).json({ msg: "Unable to create image" })
    }
}

// get file from S3 bucket
const getFileFromS3 = async (bucketName, key) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        };
        result = await s3.getObject(params).promise();
        return result;
    } catch (error) {
        console.log(error);
        throw `unable to get file from S3 bucket`;
    }
};

const deleteFileFromS3 = async (bucketName, key) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        };
        await s3.deleteObject(params).promise();
    } catch (error) {
        console.log(error);
        throw `unable to delete file from S3 bucket`;
    }
}

module.exports = {
    s3Cors,
    s3Upload,
    s3ListBuckets,
    getFileFromS3,
    deleteFileFromS3,
    listFoldersInBucket,
}