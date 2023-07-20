const Quiz = require("../models/Quiz.js")

module.exports = async (req, res) => {
    console.log("Quiz Get page. Session UserId -> ", req.session.userId);
    console.log("Quiz Get page. body ", req.body);
    
    res.status(200).send({
        "message": "Quiz Get page."
    });
}