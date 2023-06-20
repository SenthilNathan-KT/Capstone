const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
    questionId: {
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
        required: true
      },
      correctAnswer: {
        type: String,
        required: true
      },
}, { timestamps: true});

const Questions = mongoose.model("Topics", QuestionsSchema);
module.exports = Questions;