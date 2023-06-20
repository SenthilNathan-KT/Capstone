const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicsSchema = new Schema({
    accessId: {
        type: String,
        required: true,
        unique: true
      },
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
      },
      topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topics',
        required: true
      },
      createdUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
      },
      sharedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
      },
}, { timestamps: true});

const Topics = mongoose.model("Topics", TopicsSchema);
module.exports = Topics;