const Users = require("../models/Users.js");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const user = await Users.findOne({_id: req.session.userId});
    console.log("Update Settings page, ", req.body);
    console.log("Update Settings page, ", user);
    

    let message = "Kindly enter the valid old password";
    let statusCode = 400;

    if (user) {
        if(req.body.hasOwnProperty('oldPassword')) {
            const same = await bcrypt.compare(req.body.oldPassword, user.password);
            if (same) {
                console.log("Old Password Matches");
                if (req.body.newPassword === req.body.confirmPassword) {
                    // console.log("New Password Matches");
                    user.password = req.body.newPassword;
                    user.save();
                    statusCode = 200;
                    message = "Password Updated Successfully";
                } else {
                    console.log("New Password does not match");
                    message = "New password and Confirm Password does not match";
                }
            }
        } else if(req.body.hasOwnProperty('userName')) {
            user.userName = req.body.userName;
            user.save();

            statusCode = 200;
            message = "Username Updated Successfully";
        } else {
            message = "Username and password fields are empty";
        }

    }
    
    res.status(statusCode).send({
        message: message,
        userName: user.userName,
        email: user.email,
    });
}