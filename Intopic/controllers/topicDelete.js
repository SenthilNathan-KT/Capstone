const Topics = require("../models/Topics.js")

module.exports = async (req, res) => {
    
    console.log("Topic Delete -> body = ", req.body , " and id -> " , req.params.id);
    console.log("Topic Delete Page. Session UserId -> ", req.session.userId);
    
    const deleteTopic = await Topics.findByIdAndDelete(req.params.id);
    
    console.log("Deleted topic -> ", deleteTopic);
    // .then( result => {
        res.status(200).send({
        "message": "Topic deleted successfully"
        })
    // }).catch(error => {res.status(200).send({"message": "Topic is not deleted",})});


}