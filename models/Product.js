const {Schema, model} = require("mongoose");
const ProductSchema = new Schema({
    name:{
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        required: true,
        trim: true,
    },
    shipping:{
        type: Number,
    },
    pickUpOnly:{
        type: Boolean
    },
    onSale:{
        type: Number
    },
    saleEnd:{
        type: String,
        trim: true
    },
    logo:{
        type: String,
        trim: true
    },
    views:{
        type: Number,
        default: 0
    },
    sold:{
        type: Number,
        default: 0
    }
}, {timestamps:true});
module.exports = model("Product", ProductSchema);