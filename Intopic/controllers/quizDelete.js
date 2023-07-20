const Quiz = require("../models/Quiz.js")

module.exports = async (req, res) => {
    console.log("Quiz Delete page. Session UserId -> ", req.session.userId);
    console.log("Quiz Delete page. body ", req.body);
    
    res.status(200).send({
        "message": "Quiz Delete page."
    });
}