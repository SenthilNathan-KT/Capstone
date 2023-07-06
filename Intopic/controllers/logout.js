module.exports = async (req, res) => {
    console.log("Printing from loginOut.js page");
    res.status(400).send("Logged out successfully.");
}