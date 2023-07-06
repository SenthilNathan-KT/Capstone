const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UsersSchema = new Schema({
    userName: {
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


UsersSchema.pre("save", function(next){
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash;
      next();
  })
})


UsersSchema.plugin(uniqueValidator, {message: "Chosen email already exists"});
const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;