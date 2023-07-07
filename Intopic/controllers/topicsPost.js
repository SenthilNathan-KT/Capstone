const Topics = require("./../models/Topics.js")

module.exports = async (req, res) => {
    
    // let obj = {};
    // obj.userId = "64a4b18f318f75eb6a5512ef";
    // obj.title = "Topic 3";
    // obj.imageURL = "imageURL 3";
    // obj.description = "Topic 3 - description";
    // obj.noOfQuizzesAvailable = 3;
    // Topics.create(obj);

    let topics;

    const allTopics = Topics.find({}).then((data, err) => {
        // console.error('documents -> ', data, " , error -> ", err);
        // if (err) {
        //     console.error('Error retrieving documents: Docu -> ', do);
        //     return;
        //   }
      
          // Map the raw documents to instances of your model class
            topics = data;

            console.error('result 1 -> ', topics);
          
          // Send the documents in the response
        //   res.json(result);
    })
    
    console.log("Printing from topicsPost.js page. obj -> ", allTopics);

    console.error('result 2 -> ', topics);
    res.status(200).send({
        "message": "Retrieved", 
        topics: topics
    });
}