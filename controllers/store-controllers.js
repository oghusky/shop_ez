const Store = require("../models/Store"),
    Product = require("../models/Product"),
    User = require("../models/User"),
    { signToken } = require("../utils/auth");
exports.createStore = async (req, res) => {
    try {
        const { name, email } = req.body
        if (!name) return res.status(500).json({ msg: "Store name field must be filled" })
        if (!email) return res.status(500).json({ msg: "Store email field must be filled" })
        const store = await Store.find({ name })
        if (store?.name) return res.status(500).json({ msg: "A store with that name already exists" });
        else {
            const user = await User.findByIdAndUpdate(req.userId, { userType: "admin" }, { new: true });
            const updatedUser = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType,
                isVerified: user.isVerified
            }
            const token = await signToken(updatedUser)
            const newStore = await Store.create({ name, email, adminId: req.userId });
            return res.status(201).json({ msg: "Store created", newStore, updatedUser, token });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to create store" })
    }

}

exports.getStoreById = async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findById(storeId);
        store.views++;
        store.save();
        return res.status(200).json({ msg: "Found store", store })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ msg: "Unable to find store" });
    }
}

exports.getStoresByName = async (req, res) => {
    try {
        const { storeName } = req.params
        console.log(storeName);
        const stores = await Store.find({ name: { $regex: storeName, $options: "i" } });
        return res.status(200).json({ msg: "Found Stores", stores })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to find store by that name" })
    }
}


exports.getSingleStoreByName = async (req, res) => {
    try {
        const { storeName } = req.params;
        const store = await Store.findOne({ name: { $regex: storeName, $options: "i" } });
        return res.status(200).json({ msg: "Found Store", store })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Unable to find store by that name" })
    }
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
        console.log(req.body);
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
        const store = await Store.findById(storeId);
        store.products.forEach(async productId => {
            await Product.findByIdAndRemove(productId);
        })
        return res.status(200).json({ msg: "Store deleted" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Unable to delete store" });
    }
}