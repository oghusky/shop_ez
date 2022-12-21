const { Schema, model } = require("mongoose"),
    RatingSchema = new Schema({
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        storeId: {
            type: Schema.Types.ObjectId,
            ref: "Store"
        },
        score: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        review: {
            type: String,
            trim: true,
            required: true
        },
        image: {
            type: String,
            trim: true,
            required: true
        }
    }, { timestamps: true });
module.exports = model("Rating", RatingSchema);