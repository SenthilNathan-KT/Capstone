const Topics = require("../models/Topics.js");
const Quiz = require("../models/Quiz.js")

module.exports = async (req, res) => {
    console.log("Received a request to fetch topics");
    const allTopics = await Topics.find({userId: req.session.userId});
    const topicCount = allTopics.length;

    const topicsWithQuizCounts = await Promise.all(allTopics.map(async (topic) => {
        const quizzesCount = await Quiz.countDocuments({ topicId: topic._id });
        return {
            _id: topic._id,
            title: topic.title,
            quizzesCount: quizzesCount
        };
    }));
    
    const quizCount = topicsWithQuizCounts.reduce((total, topic) => total + topic.quizzesCount, 0);
    // console.log("Printing quiz length -> ", quizCount);
    
    res.status(200).send({
        "message": "Retrieved", 
        allTopics: allTopics,
        topicCount: topicCount,
        quizCount: quizCount
    });
}