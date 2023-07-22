const Topics = require("../models/Topics.js")

module.exports = async (req, res) => {
    
    // console.log("Topic Post -> ", req.body);
    console.log("TopicPostPage. Session UserId -> ", req.session.userId);
    
    let obj = {};
    obj.userId = req.session.userId;
    obj.title = req.body.title;
    console.log(req.body.title);
    obj.description = req.body.description;
    console.log(req.body.description);
    // obj.imageURL = "imageURL 3";
    // obj.noOfQuizzesAvailable = 3;
    console.log("Topic Post Object created -> ", obj);
    Topics.create(obj);

    res.status(200).send({
        "message": "Topic created successfully"
    });

}