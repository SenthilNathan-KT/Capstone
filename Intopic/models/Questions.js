const mongoose = require("mongoose");
const Topics = require("../models/Topics.js")
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
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
      questionType: {
        type: String,
        required: true
      },
      question: {
        type: String,
        required: true
      },
      options: {
        type: [String],
      },
      correctAnswer: {
        type: String,
        required: true
      },
}, { timestamps: true});

const Questions = mongoose.model("Questions", QuestionsSchema);
module.exports = Questions;