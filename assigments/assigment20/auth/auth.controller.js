const express = require("express");
const AuthService = require("./auth.service");
const isAuth = require("../middlewares/is-auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  signInSchema,
  signUpSchema,
} = require("../validations/auth.validation");
const getLeaderboard = require("../services/leaderboard.service");

const router = express.Router();

router.post("/sign-up", validate(signUpSchema), async (req, res, next) => {
  try {
    const result = await AuthService.signUp(req.body);

    if (result === "ALREADY_EXISTS") {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const io = req.app.get("io");
    if (io) io.emit("leaderboard:update", await getLeaderboard());

    res.status(201).json({
      message: "Account created successfully",
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/sign-in", validate(signInSchema), async (req, res, next) => {
  try {
    const result = await AuthService.signIn(req.body);

    if (result === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    res.json({ message: "Signed in successfully", ...result });
  } catch (error) {
    next(error);
  }
});

router.get("/current-user", isAuth, async (req, res, next) => {
  try {
    const user = await AuthService.currentUser(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
