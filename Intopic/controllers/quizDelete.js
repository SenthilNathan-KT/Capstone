const Quiz = require("../models/Quiz.js");
const Question = require("../models/Questions.js")
const Topics = require("../models/Topics.js")

module.exports = async (req, res) => {
    // console.log("Quiz Delete page. quiz ID -> ", req.params.quizId, ", TopicId -> ", req.params.topicId);
    // console.log("Quiz Delete page. body ", req.body);

    const quiz = await Quiz.findOne({_id: req.params.quizId , topicId: req.params.topicId, userId: req.session.userId})
    console.log("Retrieved Quiz -> ", quiz);

    if(!quiz) {
        console.log("Inside not found");
        return res.status(404).send({
            "message": "Quiz not found"
        })
    }

    // console.log("Inside quiz ", quiz._id, ", ", req.session.userId);
    const question = await Question.deleteMany({quizId: quiz._id})
    console.log("Questions Deleted -> ", question._id);
    const delQuiz = await Quiz.deleteOne({_id: quiz._id, topicId: req.params.topicId, userId: req.session.userId})
    console.log("Quiz Deleted -> ", delQuiz._id);

    if (delQuiz.deletedCount === 1) {        
        const updatedTopic = await Topics.findOneAndUpdate({ _id: req.params.topicId}, {  $inc: {noOfQuizzesAvailable: -1}})
        // console.log("and update complete -> ", updatedTopic);
    }
    
    res.status(200).send({
    "message": "Quiz deleted successfully"
    })
}