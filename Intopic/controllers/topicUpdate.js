const Topics = require("../models/Topics.js")

module.exports = async (req, res) => {
    
    // console.log("Topic Update -> ", req.body);
    // console.log("TopicUpdatePage. Session UserId -> ", req.session.userId);

    const updatedTopic = await Topics.findByIdAndUpdate(req.params.id, {title: req.body.title, description: req.body.description, image: req.body.image}, {new: true});
    console.log("updatedTopic -> ", updatedTopic);
    if(updatedTopic) {
        res.status(200).send({
        "message": "Topic updated successfully",
        "topic": updatedTopic
        })
    } else { res.status(200).send({"message": "Topic not updated",}) };

}