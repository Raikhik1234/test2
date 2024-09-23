const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const saltRounds = 10;

const userModel = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    age: {
        type: Number
    },
    user_role: {
        type: String,
        default:'user',
        enum: ['user', 'admin']
    },
    profile_pic: {
        type: String
    },
    active_status: {
        type: Boolean,
        default: true,
        enum: [true, false]
    },
    delete_status: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
}, { timestamps: true, versionKey: false });

userModel.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, saltRounds, null);
};

userModel.methods.compareHash = function (password, confirmpassword) {
    return bcrypt.compareSync(password, confirmpassword, null);
};

module.exports = mongoose.model('users', userModel);

