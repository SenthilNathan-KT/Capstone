const Topics = require("../models/Topics.js");
const Quiz = require("../models/Quiz.js")
const Question = require("../models/Questions.js")

module.exports = async (req, res) => {
    
    const topicToDelete = await Topics.findById({ _id: req.params.id, userId: req.session.userId});
    // console.log("Retrieved Topics -> ", topicToDelete);
    if(!topicToDelete) {
        return res.status(404).send({
            "message": "Topic not found"
        })
    }
    const quizzes = await Quiz.find({topicId: req.params.id, userId: req.session.userId})
    // console.log("Retrieved Quiz -> ", quizzes);

    for(const quiz of quizzes) {
        const question = await Question.deleteMany({quizId: quiz._id})
        // console.log("Questions Deleted -> ", question);
        const delQuiz = await Quiz.deleteOne({_id: quiz._id, topicId: req.params.id, userId: req.session.userId})
        // console.log("Quiz Deleted -> ", delQuiz);
    }
    const deletedTopic = await Topics.findByIdAndDelete({ _id: req.params.id, userId: req.session.userId});
    // console.log("Topic Deleted -> ", deletedTopic);
    
        res.status(200).send({
        "message": "Topic deleted successfully"
        })

}