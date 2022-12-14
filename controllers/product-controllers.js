const Store = require("../models/Store"),
    Product = require("../models/Product"),
    User = require("../models/User");

exports.createProduct = async (req, res) => {
    const { storeId } = req.params;
    const { name, price, description } = req.body;
    try {
        if (!name || !price || !description) return res.status(500).json({ msg: "Name, Price and Description fields must be filled" });
        const store = await Store.findById(storeId);
        if (!store?.name) return res.status(404).json({ msg: "Store doesn't exist" });
        if (store?.name) {
            const product = await Product.create({ name, price, description, storeId });
            store.products.push(product);
            await store.save();
            return res.status(201).json({ msg: "Product created", product });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Unable to create product" })
    }
}