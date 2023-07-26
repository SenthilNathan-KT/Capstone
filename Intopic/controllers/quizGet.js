const Quiz = require("../models/Quiz.js");
const Question = require("../models/Questions.js");

module.exports = async (req, res) => {
    // console.log("Quiz Get page. Session UserId -> ", req.session.userId);
    let topicId = req.params.topicId;
    let quizId = req.params.quizId;
    console.log("Quiz id -> ", quizId, " && topicID ->", topicId);
    const quizObj = await Quiz.findById({_id: quizId, topicId: topicId, userId: req.session.userId});
    console.log("Quiz get page. Obj -> " , quizObj);
    const questionsObj = await Question.find({quizId: quizId, topicId: topicId});
    console.log("Question Obj -> " , questionsObj);
    
    res.status(200).send({
        "message": "Quiz retrieved successfully",
        quiz: quizObj,
        questions: questionsObj
    });
}