const Quiz = require("../models/quiz.model");
const quizzes = require("../data/quizzes");

async function seedQuizzes() {
  const quizTitles = quizzes.map((quiz) => quiz.title);

  const existingTitles = await Quiz.find({
    title: { $in: quizTitles },
  }).distinct("title");

  const existingTitleSet = new Set(existingTitles);

  const missingQuizzes = quizzes.filter(
    (quiz) => !existingTitleSet.has(quiz.title),
  );

  if (missingQuizzes.length === 0) {
    console.log("Quiz seed skipped: all quizzes already exist");
    return;
  }

  await Quiz.insertMany(missingQuizzes);

  console.log(`${missingQuizzes.length} quizzes inserted successfully`);
}

module.exports = seedQuizzes;
