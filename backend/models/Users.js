const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    timestamps: true
});

const User = mongoose.model('UserData', UserSchema);
module.exports = User;