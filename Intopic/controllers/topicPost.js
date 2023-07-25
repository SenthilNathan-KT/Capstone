const Topics = require("../models/Topics.js")

module.exports = async (req, res) => {
    
    // console.log("Topic Post -> ", req.body);
    console.log("TopicPostPage. Session UserId -> ", req.session.userId);
    console.log("TopicPostPage. Req.Body -> ", req.body);
    
    let obj = {};
    obj.userId = req.session.userId;
    obj.title = req.body.title;
    obj.description = req.body.description;
    obj.image = req.body.image;
    // console.log("Topic Obj -> ", obj);

    // obj.imageURL = "imageURL 3";
    // obj.noOfQuizzesAvailable = 3;
    const topicObj = await Topics.create(obj);
    console.log("Topic Post Object created -> ", topicObj);

    res.status(200).send({
        "message": "Topic created successfully"
    });

}