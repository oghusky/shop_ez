const Store = require("../models/Store"),
    User = require("../models/User");
exports.createStore = async (req, res) => {
    console.log("user logged in", req.user)
    try {
        const { name, email } = req.body
        if (!name) return res.status(500).json({ msg: "Store name field must be filled" })
        if (!email) return res.status(500).json({ msg: "Store email field must be filled" })
        const store = await Store.find({ name })
        if (store?.name) return res.status(500).json({ msg: "A store with that name already exists" });
        else {
            const newStore = await Store.create({ name, email, adminId: req.userId });
            return res.status(201).json({ msg: "Store created", newStore });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to create store" })
    }

}

exports.getStoreById = async (req, res) => {
    try {
        const { storeId } = req.params
        const store = await Store.findById(storeId);
        return res.status(200).json({ msg: "Found store", store })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ msg: "Unable to find store" });
    }
}

exports.getStoresByName = async (req, res) => {
    try {
        const { storeName } = req.params
        const stores = await Store.find({ name: { $regex: storeName } });
        return res.status(200).json({ msg: "Found Stores", stores })
    } catch (err) { }
}

exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        return res.status(200).json({ msg: "Found Stores", stores });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to find stores" })
    }
}

exports.findStoresByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const stores = await Store.find({ adminId: userId });
        return res.status(200).json({ msg: "Found Stores", stores })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Unable to find stores" })
    }
}

exports.updateStoreById = async (req, res) => {
    try {
        const { storeId } = req.params
        const store = await Store.findByIdAndUpdate(storeId, req.body, { new: true });
        return res.status(200).json({ msg: "Store updated", store });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Unable to update store" });
    }
}

exports.deleteStore = async (req, res) => {
    try {
        const { storeId } = req.params
        const store = await Store.findByIdAndRemove(storeId);
        return res.status(200).json({ msg: "Store deleted" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Unable to delete store" });
    }
}