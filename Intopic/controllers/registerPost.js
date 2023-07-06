const Users = require("../models/Users");

module.exports = async (req, res) => {

    let message = "User Registered Successfully";
    let statusCode = 200;

    // console.log("Printing from registerPost.js page. body -> ", req.body);
    // const { userName, email, password, reEnterPassword } = req.body;
    let userObj = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        reEnterPassword: req.body.reEnterPassword,
    }

    if(userObj.password != userObj.reEnterPassword) {
        console.log("Passwords does not match");
        message = "Password doesn't match";
        statusCode = 400;

    } else {
        console.log("Passwords match");
        try {
            const createdUserObj = await Users.create(userObj);
            // console.log("User created successfully", createdUserObj);
            userObj = createdUserObj;
        } catch (error ) {
            statusCode = 400;
            const  validationErrors = Object.keys(error.errors).map(
                key => error.errors[key].message
            );

            console.log("StoreUserError -> " + validationErrors);
            message =  validationErrors;
            console.log("data", userObj);
        }
    }

    res.status(statusCode).send({
        "message" : message,
        userObj: userObj
    });
}