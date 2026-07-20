const Quiz = require("../models/quiz.model");

async function getAllQuizzes(req, res, next) {
  try {
    const quizzes = await Quiz.find().select("title topic").sort({ title: 1 });

    res.json({
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
}

async function getQuizById(req, res, next) {
  try {
    const quiz = await Quiz.findById(req.params.id).lean();

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    const questions = quiz.questions.map((question) => ({
      _id: question._id,
      question: question.question,
      options: question.options,
      points: question.points,
    }));

    res.json({
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        topic: quiz.topic,
        totalQuestions: questions.length,
        questions,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllQuizzes,
  getQuizById,
};
