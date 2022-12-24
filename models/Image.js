const { Schema, model } = require("mongoose"),
    ImageSchema = new Schema({
        url: {
            type: String,
            trim: true,
            required: true
        },
        imageType: {
            type: String,
            trim: true,
            required: true
        },
        storeId: {
            type: Schema.Types.ObjectId,
            ref: "Store",
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        eTag: {
            type: String,
            trim: true,
            required: true
        }
    }, { timestamps: true });
module.exports = model("Image", ImageSchema);