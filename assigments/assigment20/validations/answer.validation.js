const { z } = require("zod");
const { mongoIdSchema } = require("./common.validation");

const submitAnswerSchema = z
  .object({
    quizId: mongoIdSchema,
    questionId: mongoIdSchema,

    selectedOption: z
      .number()
      .int("Selected option must be an integer")
      .min(0, "Selected option must be between 0 and 3")
      .max(3, "Selected option must be between 0 and 3"),
  })
  .strict();

module.exports = {
  submitAnswerSchema,
};
