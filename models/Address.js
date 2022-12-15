const {Schema, model} = require("mongoose"),
AddressSchema = new Schema({
    street: {
        type: String,
        trim: true,
        required: true,
    },
    suite:{
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    state: {
        type: String,
        trim: true,
        require: true,
    },
    zip: {
        type: Number,
        trim: true,
        required: true
    },
    country:{
        type: String,
        trim: true,
    }
}, {timestamps:true});
module.exports = model("Address", AddressSchema)