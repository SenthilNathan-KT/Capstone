const Topics = require("../models/Topics.js")
const Quiz = require("../models/Quiz.js")

module.exports = async (req, res) => {
    const topicId = req.params.topicId;
    console.log("TopicWithIDGetPage, param topicid -", topicId, ", UID -> ", req.session.userId);
    const topics = await Topics.find({_id: topicId, userId: req.session.userId});
    // console.log("Topic with ID obj -> ", topics);
    const quizzes = await Quiz.find({topicId: topicId, userId: req.session.userId})
    console.log("Quizzes with ID obj -> ", quizzes);
    res.status(200).send({
        "message": "Retrieved", 
        topics: topics,
        quizzes: quizzes
    });
}