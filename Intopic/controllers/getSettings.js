const Users = require("../models/Users.js");

module.exports = async (req, res) => {
    const userObj = await Users.findOne({_id: req.session.userId});
    console.log("Settings Get page, ", userObj.userName);
    
    
    res.status(200).send({
        userName: userObj.userName,
        email: userObj.email,
    });
}