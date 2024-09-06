const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
});

const User = model("User", userSchema);

module.exports = User;