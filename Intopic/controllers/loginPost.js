const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    console.log("Printing from loginPost.js page. body -> " , req.body);
    let statusCode = 400;
    let message = "Logged in Successfully";
    
    const { email, password } = req.body;
    let userObj = {};
    userObj.email= email;
    userObj.password = password;
    const user = await Users.findOne({email:email});

    // console.log("User object retrieved -> ", user);
    if (user) {
        const same = await bcrypt.compare(password, user.password);
        if (same) {
            // console.log("Password match");
            statusCode = 200;             
            
            userObj.userId = user._id;
            userObj.email= user.email;
            userObj.token = jwt.sign(userObj, process.env.JSON_WEB_TOKEN_KEY, { expiresIn: "1h" });
            // console.log("User obj after token " + user);
            console.log("token " + userObj.token);
        } else {

            console.log("Password Doesn't match. Obj -> ", userObj);
            message = "Kindly enter a valid password";
        }
        
    } else {
        console.log("Email Address not found. Obj -> ", userObj);
        message = "Kindly enter a valid email address";
    }

    // console.log("SC - ", statusCode, ", msg - ", message);   

    res.status(statusCode).send({
        "message" : message,
        userObj : userObj
    });
}