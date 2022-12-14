const Store = require("../models/Store"),
    Product = require("../models/Product");

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

exports.getProductsByStoreId = async (req, res) => {
    const { storeId } = req.params;
    try {
        const store = await Store.findById(storeId);
        if (!store?.name) return res.status(404).json({ msg: "Store doesn't exist" });
        if (store?.name) {
            const products = await Product.find({ storeId });
            return res.status(200).json({ msg: "Found Products", products })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to find products" })
    }
}

exports.getProductByItemId = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        product.views++;
        product.save();
        return res.status(200).json({ msg: "Found product", product });
    } catch (err) {
        console.log(err);
        return res.status(404).json({ msg: "Product doesn't exist" });
    }
}

exports.getProductsByProductName = async (req, res) => {
    const { productName } = req.params;
    try {
        const products = await Product.find({ name: { $regex: productName, $options: "i" } })
        return res.status(200).json({ msg: "Found Products", products });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Unable to find products with that name" })
    }
}

exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        return res.status(200).json({ msg: "Product updated", product });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to update product" })
    }
}

exports.deleteProduct = async (req, res) => {
    const { productId, storeId } = req.params;
    try {
        const store = await Store.findById(storeId);
        store.products = store.products.filter(item => String(item) !== productId);
        store.save();
        await Product.findByIdAndRemove(productId);
        return res.status(200).json({ msg: "Product deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to delete product" });
    }
}