const express = require("express");

const { submitAnswer } = require("../controllers/answer.controller");

const validate = require("../middlewares/validate.middleware");

const { submitAnswerSchema } = require("../validations/answer.validation");
const isAuth = require("../middlewares/is-auth.middleware");

const router = express.Router();

router.post("/", isAuth, validate(submitAnswerSchema), submitAnswer);

module.exports = router;
