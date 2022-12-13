const { Schema, model } = require("mongoose");
const StoreSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be valid']
    },
    phone: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    pinterest: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    tiktok: {
        type: String,
    },
    youtube: {
        type: String,
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    membership:{
        type:String,
        enum: ["basic", "pro", "enterprise"],
        default: "basic"
    }
}, {timestamps: true});
module.exports = model("Store", StoreSchema);