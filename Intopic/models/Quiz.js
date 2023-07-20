const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topics',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  description: {
    type: String
  },
  quizAccessFromTime: {
    type: Date,
  },
  quizAccessToTime: {
    type: Date,
  },
  isQuizActive: {
    type: Boolean,
    default: true
  },
}, { timestamps: true});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;