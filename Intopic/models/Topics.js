const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicsSchema = new Schema({
  topicId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
  },
  description: {
    type: String
  },
  noOfQuizzesAvailable: {
    type: Number,
    default: 0
  },
}, { timestamps: true});

const Topics = mongoose.model("Topics", TopicsSchema);
module.exports = Topics;