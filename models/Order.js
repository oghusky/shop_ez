const {Schema, model} = require("mongoose");
const OrderSchema = new Schema({
    storeId:{
        type: Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    status: {
        type: String,
        enum: ["canceled", "delivered", "transit", "payment due", "pick up available", "processing", "returned"],
        default: "payment due",
    },
    shippingAddress:{
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    }
}, {timestamps:true});

module.exports = model("Order", OrderSchema);