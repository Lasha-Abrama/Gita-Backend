const User = require("../models/user.model");
const Quiz = require("../models/quiz.model");
const getLeaderboard = require("../services/leaderboard.service");

async function submitAnswer(req, res, next) {
  try {
    const { quizId, questionId, selectedOption } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    const question = quiz.questions.id(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found in this quiz",
      });
    }

    const alreadyAnswered = user.answeredQuestions.some((answeredQuestionId) =>
      answeredQuestionId.equals(questionId),
    );

    if (alreadyAnswered) {
      return res.status(409).json({
        message: "You have already answered this question",
      });
    }

    const isCorrect = selectedOption === question.correctOption;

    const earnedPoints = isCorrect ? question.points : 0;

    user.answeredQuestions.push(question._id);
    user.score += earnedPoints;

    await user.save();

    const leaderboard = await getLeaderboard();

    const io = req.app.get("io");

    if (io) {
      io.emit("leaderboard:update", leaderboard);
    }

    res.json({
      message: isCorrect ? "Correct answer" : "Incorrect answer",

      result: {
        isCorrect,
        correctOption: question.correctOption,
        earnedPoints,
        totalScore: user.score,
      },

      leaderboard,
    });
  } catch (error) {
    next(error);
  }
}

async function getLeaderboardController(req, res, next) {
  try {
    const leaderboard = await getLeaderboard();

    res.json({
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submitAnswer,
  getLeaderboardController,
};
