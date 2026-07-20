const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
    trim: true,
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator(options) {
        return options.length === 4;
      },
      message: "Each question must have exactly 4 options",
    },
  },

  correctOption: {
    type: Number,
    required: [true, "Correct option is required"],
    min: 0,
    max: 3,
  },

  points: {
    type: Number,
    default: 10,
    min: 1,
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      unique: true,
      trim: true,
    },

    topic: {
      type: String,
      required: [true, "Quiz topic is required"],
      trim: true,
    },

    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator(questions) {
          return questions.length === 10;
        },
        message: "Each quiz must have exactly 10 questions",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
