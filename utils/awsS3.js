const AWS = require("aws-sdk"),
    fs = require("fs"),
    path = require("path");
const s3 = new AWS.S3({ region: "us-east-1" });

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

const s3Upload = async (bucketName, file, alias) => {
    try {
        const uploadParams = {
            Bucket: bucketName,
            Key: "",
            ACL: "public-read",
        };
        const fileStream = fs.createReadStream(file);
        uploadParams.Body = fileStream;
        uploadParams.Key = alias || path.basename(file);
        result = await s3.upload(uploadParams).promise();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
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