const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be valid']
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        select: false,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/, 'Field must be valid']
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
    userType: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    logo: {
        type: String
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        suite:{
            type: String,
            trim: true
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
            type: Number,
            trim: true,
        },
        country:{
            type: String,
            trim: true
        }
    },
    isVerified:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = model("User", UserSchema);