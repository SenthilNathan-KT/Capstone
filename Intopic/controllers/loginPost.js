module.exports = async (req, res) => {
    console.log("Printing from loginPost.js page.");
    console.log(req.body);
    res.send("Login Post Page");
}