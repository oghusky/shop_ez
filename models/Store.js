const { Schema, model } = require("mongoose");
const StoreSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be valid']
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    policies: {
        type: String,
        trim: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    membership: {
        type: String,
        enum: ["basic", "pro", "enterprise"],
        default: "basic"
    },
    membership_status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    reports: [{
        type: Schema.Types.ObjectId,
        ref: "Reports"
    }],
    views: {
        type: Number,
        default: 0
    },
    logo: {
        type: String
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    zip: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true
    },
    theme: {
        type: String,
        trim: true
    },
    paymentInfo: {} // what????
}, { timestamps: true });
module.exports = model("Store", StoreSchema);