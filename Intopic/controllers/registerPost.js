module.exports = async (req, res) => {
    console.log("Printing from registerPost.js page.");
    console.log(req.body);
    const { userName, email, password, reEnterPassword } = req.body;
    res.send("Registration successful");
}