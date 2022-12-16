const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    const { storeId } = req.params;
    const {products, shippingAddress} = req.body;
    try { 
        const order = await Order.create({storeId, userId: req.user, products, shippingAddress});
        return res.status(201).json({msg:"Order created", order});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to create order" });
    }
}