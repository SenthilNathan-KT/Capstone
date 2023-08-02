const Topics = require("../models/Topics.js");

module.exports = async (req, res) => {
    // console.log("Received a request to fetch topics");
    // console.log("TopicGetPage. Session UserId -> ", req.session.userId);
    const allTopics = await Topics.find({userId: req.session.userId});
    // console.log("Printing from topicsPost.js page. obj -> ", allTopics);
    res.status(200).send({
        "message": "Retrieved", 
        allTopics: allTopics
    });
}