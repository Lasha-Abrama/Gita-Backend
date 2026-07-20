const express = require("express");

const {
  getAllQuizzes,
  getQuizById,
} = require("../controllers/quiz.controller");

const validate = require("../middlewares/validate.middleware");
const { idParamSchema } = require("../validations/common.validation");

const router = express.Router();

router.get("/", getAllQuizzes);

router.get("/:id", validate(idParamSchema, "params"), getQuizById);

module.exports = router;
