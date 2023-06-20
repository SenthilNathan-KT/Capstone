const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UsersSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
      },
    username: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
      },
}, { timestamps: true});

UsersSchema.plugin(uniqueValidator, {message: "Email already exists"});
const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;