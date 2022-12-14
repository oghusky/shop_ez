const User = require("../models/User"),
    bcrypt = require("bcryptjs"),
    { signToken } = require("../utils/auth"),
    { checkPassword } = require("../utils/checkPassword"),
    { checkEmail } = require("../utils/checkEmail");
exports.createUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        if (!email) return res.status(500).json({ msg: "Email required" });
        if (!checkEmail(email)) return res.status(500).json({ msg: "Email must be proper format" });
        if (!password) return res.status(500).json({ msg: "Password required" });
        if (!checkPassword(password)) return res.status(500).json({ msg: "Password isn't valid" });
        if (!firstName || !lastName) return res.status(500).json({ msg: "First and last name required" })
        const user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({ msg: "USER WITH THAT INFO EXISTS" });
        }
        const newUser = await User.create({ email, password, firstName, lastName })
        const token = await signToken(newUser);
        return res.status(201).json({
            token,
            msg: "USER CREATED",
            user: {
                _id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userType: newUser.userType
            },
        })
    } catch (err) {
        console.log(err);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if (user?.email) {
            const authUser = await bcrypt.compare(password, user.password);
            if (authUser) {
                const token = await signToken(user);
                return res.status(200).json({
                    token,
                    user: {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                    },
                    msg: "FOUND USER",
                });
            }
            else return res.status(500).json({ msg: "Info doesn't match" })
        }
        else return res.status(404).json({ msg: "USER DOESN'T EXIST" })
    } catch (err) {
        console.log(err);
    }
}

exports.findUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({ msg: "Found user", user });
    } catch (err) {
        console.log(err);
    }
}

exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (user) {
            const token = await signToken(user);
            return res.status(200).json({ msg: "USER UPDATED", user, token });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndRemove(userId);
        if (user) return res.status(200).json({ msg: "USER DELETED" });
    } catch (err) {
        console.log(err);
    }
}