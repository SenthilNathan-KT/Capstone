const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  quizId: {
    type: String,
    required: true,
    unique: true
  },
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
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  quizAccessFromTime: {
    type: Date,
    required: true
  },
  quizAccessToTime: {
    type: Date,
    required: true
  },
  isQuizActive: {
    type: Boolean,
    default: true
  },
}, { timestamps: true});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;