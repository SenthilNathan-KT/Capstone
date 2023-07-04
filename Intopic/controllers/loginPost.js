module.exports = async (req, res) => {
    console.log("Printing from loginPost.js page.");
    console.log(req.body);
    const { email, password } = req.body;
    res.send("Login successful");
}