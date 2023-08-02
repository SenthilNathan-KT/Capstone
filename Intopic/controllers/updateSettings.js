const Users = require("../models/Users.js");

module.exports = async (req, res) => {
    const userObj = await Users.findOne({_id: req.session.userId});
    console.log("Update Settings page, ", userObj.userName);
    
    
    res.status(200).send({
        message: "Update setting page. Needs to update the password.", 
        userName: userObj.userName,
        email: userObj.email,
    });
}