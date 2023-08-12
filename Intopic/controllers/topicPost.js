const Topics = require("../models/Topics.js")

module.exports = async (req, res) => {
    
    // console.log("Topic Post -> ", req.body);
    // console.log("TopicPostPage. Session UserId -> ", req.session.userId);
    // console.log("TopicPostPage. Req.Body -> ", req.body);
    
    let obj = {};
    obj.userId = req.session.userId;
    obj.title = req.body.title;
    obj.description = req.body.description;
    obj.image = req.body.image;
    console.log("Topic Obj -> ", obj);

    try {
        const topicObj = await Topics.create(obj);
        console.log("Topic Post Object created -> ", topicObj);
    } catch (error ) {

        if (error.code === 11000) {
            console.error('Duplicate key error:', error.message);
            return res.status(400).send({
                "message" : "Kindly enter a unique topic name",
                "error" : "Error in topic creation"
            });    
        }
    }
    
    return res.status(200).send({
        "message": "Topic created successfully"
    });

}