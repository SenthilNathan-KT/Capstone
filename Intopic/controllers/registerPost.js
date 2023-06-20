module.exports = async (req, res) => {
    console.log("Printing from registerPost.js page.");
    console.log(req.body);
    res.send("Register Post Page");
}