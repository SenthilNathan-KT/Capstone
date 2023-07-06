const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    console.log("Printing from loginPost.js page. body -> " , req.body);
    let userObj = {};
    let statusCode = 400;
    let message = "Logged in Successfully";

    const { email, password } = req.body;
    const user = await Users.findOne({email:email});

    console.log("User object retrieved -> ", user);
    if (user) {
        const same = await bcrypt.compare(password, user.password);
        if (same) {
            // console.log("Password match");
            statusCode = 200;             
            
            userObj.userId = user._id;
            userObj.email= user.email;
            userObj.token = jwt.sign(userObj, process.env.JSON_WEB_TOKEN_KEY, { expiresIn: "1h" });
            // console.log("User obj after token " + user);
        } else {
            console.log("Password Doesn't match");
            message = "Kindly enter a valid password";
        }
        
    } else {
        console.log("Email Address not found");
        message = "Kindly enter a valid email address";
    }

    // console.log("SC - ", statusCode, ", msg - ", message);   

    res.status(statusCode).send({
        "message" : message,
        userObj : userObj
    });
}