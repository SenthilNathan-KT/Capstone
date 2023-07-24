const Quiz = require("../models/Quiz.js")

module.exports = async (req, res) => {
    console.log("Quiz Delete page. quiz ID -> ", req.param.quizId);
    console.log("Quiz Delete page. body ", req.body);

    // const deleteQuiz = await Quiz.findByIdAndDelete(req.params.id);
    
    res.status(200).send({
        "message": "Quiz Delete page."
    });
}