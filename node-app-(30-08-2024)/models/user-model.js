const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const saltKey = 10;

const userSchema = new Schema({
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
    user_role:{
        type: String,
        default: 'user',
        enum: ['user', 'admin']
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

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, saltKey, null)
}

userSchema.methods.compareHash = function (password, confirmPassword) {
    return bcrypt.compareSync(password, confirmPassword, null)
}

module.exports = mongoose.model('users', userSchema);